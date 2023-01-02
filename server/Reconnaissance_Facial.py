import cv2
import dlib
import PIL.Image
import numpy as np
from imutils import face_utils
import argparse
from pathlib import Path
import os
import ntpath
#import pyrebase
from firebase import firebase
from datetime import * 
import firebase_admin
from firebase_admin import credentials, storage
import os
import tempfile

# connexion a la base de donnée (firebase) 
def configData():
  fb_app = firebase.FirebaseApplication('https://fasecam-44231-default-rtdb.europe-west1.firebasedatabase.app/', None)
  return fb_app   

# connexion a la base de donnée Storage (firebase) 
def configStorage():
    creds = credentials.Certificate('./keyFirebase/serviceAccountKey.json')
    firebase_admin.initialize_app(creds, {
        'storageBucket': 'fasecam-44231.appspot.com'
    })
    bucket = storage.bucket()
    return bucket   

# sauvgarder les données dans la base de donnée (firebase)
def save_data(firebase_data, name, ):
    today = datetime.today()
    now = datetime.now()
    date = today.strftime("%d/%m/%Y")
    date_time = now.strftime("%H:%M")
    data = {'fullName' : name , 'time' : date_time , 'date': date }
    firebase_data.post('faceCam/', data)

# get les données dans la base de donnée (firebase)
def get_data(result):
    data = []
    for id in result :
        data.append({'fullName': result[id]['fullName'],'date' : result[id]['date'] })
    return data
    
def check_data_exist(result,name):
    if(result !=None ): 
        data = get_data(result)
        for val in data :
            if val['date'] in str(datetime.today().strftime("%d/%m/%Y")) and val['fullName'] == name : 
                return True          
    
# cette fonction permet de transformer les coordonnées de visage
def transform(image, face_locations):
    coord_faces = []
    for face in face_locations:
        rect = face.top(), face.right(), face.bottom(), face.left()
        coord_face = max(rect[0], 0), min(rect[1], image.shape[1]), min(rect[2], image.shape[0]), max(rect[3], 0)
        coord_faces.append(coord_face)
    return coord_faces

# cette fonction permet de détecter le visage puis l'encoder  
def encode_face(image, pose_predictor_68_point,face_encoder,face_detector):
    face_locations = face_detector(image, 1)
    face_encodings_list = []
    landmarks_list = []
    for face_location in face_locations:
        # detecter les visages
        shape = pose_predictor_68_point(image, face_location)
        face_encodings_list.append(np.array(face_encoder.compute_face_descriptor(image, shape, num_jitters=1)))
        # obtenir des reperes
        shape = face_utils.shape_to_np(shape)
        landmarks_list.append(shape)
    face_locations = transform(image, face_locations)
    return face_encodings_list, face_locations, landmarks_list

# cette fonction permet récupére tous lse visage connus moins le visage qui vient d'être détecté  
# puis elle récupérer le visage le plus proche qui connu du visage détecté     
def face_reco(frame, known_face_encodings, known_face_names, pose_predictor_68_point, firebase_data):
    rgb_small_frame = frame[:, :, ::-1]
    # encode visage
    face_encodings_list, face_locations_list, landmarks_list = encode_face(rgb_small_frame, pose_predictor_68_point,face_encoder,face_detector)
    face_names =[]
    for face_encoding in face_encodings_list:
        if len(face_encoding) == 0:
            return np.empty((0))
        # vérifier la distance entre les visages connus et les visages détéctés 
        vectors = np.linalg.norm(known_face_encodings - face_encoding, axis=1)
        tolerance = 0.59
        result = []
        for vector in vectors:
            if vector <= tolerance:
                result.append(True)
            else:
                result.append(False)
                
        if True in result:
            first_match_index = result.index(True)
            name = known_face_names[first_match_index]
            if name not in face_names:
                face_names.append(name)
                result = firebase_data.get('faceCam/',None)
                if check_data_exist(result,name) != True: 
                    save_data(firebase_data, name)
        else:
            name = "Inconnue"  
            face_names.append(name)
            
        
    # afficher le bloc et le texte
    for (top, right, bottom, left), name in zip(face_locations_list, face_names):
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 8)
        cv2.rectangle(frame, (left, bottom - 30), (right, bottom), (0, 255, 0), cv2.FILLED)
        cv2.putText(frame, name, (left + 2, bottom - 2), cv2.FONT_HERSHEY_SIMPLEX, min(left, bottom) * 2e-3, (0, 0, 0), 1)
    # afficher point dans le visage
    for shape in landmarks_list:
        for (x, y) in shape:
            cv2.circle(frame, (x, y), 1, (255, 0, 255), -1)

if __name__ == '__main__': 
    
    parser = argparse.ArgumentParser()
    parser.add_argument('-data', '--input', type=str, required=True, help="Répertoire des images d'entrée")
    pose_predictor_68_point = dlib.shape_predictor("Models/shape_predictor_68_face_landmarks.dat")
    face_encoder = dlib.face_recognition_model_v1("Models/dlib_face_recognition_resnet_model_v1.dat")
    face_detector = dlib.get_frontal_face_detector()   
    bucket = configStorage()
    args = parser.parse_args()
    face_to_encode_path = Path(args.input)
    firebase_data = configData()
    #get_data(firebase_data)
    # lire les image dans le dossier image data
    files = [file_ for file_ in face_to_encode_path.rglob('*.jpg')]
    for file_ in face_to_encode_path.rglob('*.png'):
        files.append(file_)
    if len(files)==0:
        raise ValueError('Aucun visage détecté dans le répertoire : {}'.format(face_to_encode_path))
    known_face_names = [os.path.splitext(ntpath.basename(file_))[0] for file_ in files]
    known_face_encodings = []
    for file_ in files:
        image = PIL.Image.open(file_)
        blob = bucket.blob('pictures/'+file_.name)
        blob.upload_from_filename(file_)
        image = np.array(image)
        face_encoded = encode_face(image, pose_predictor_68_point, face_encoder, face_detector)[0][0]
        known_face_encodings.append(face_encoded)
    print('[INFO] Des visages bien importés')
    print('[INFO] Démarrage la webcam....')
    video_capture = cv2.VideoCapture(0)
    print('[INFO] Détection...')
  
    while True:
        ret, frame = video_capture.read()
        face_reco(frame, known_face_encodings, known_face_names, pose_predictor_68_point, firebase_data)
        cv2.imshow('Reconnaissance faciale App', frame)
        if cv2.waitKey(1) & 0xFF == ord(chr(27)):
            break
    
    print('[INFO] arrêter la webcam')
    video_capture.release()
    cv2.destroyAllWindows()
