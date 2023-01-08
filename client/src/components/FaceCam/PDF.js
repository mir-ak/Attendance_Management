import jsPDF from "jspdf";
import "jspdf-autotable";
import imageParis8 from "../../images/paris8_.png";
import imageFace from "../../images/face.png";

const createNewArray = (AllFaceArray, faceArray) => {
  const students = AllFaceArray.map((item) => {
    const face = faceArray.find((face) => face.fullName === item.fullName);
    if (face) {
      return { fullName: item.fullName, status: "Présent" };
    } else {
      return { fullName: item.fullName, status: "Absent" };
    }
  });
  return students;
};

const exportPDF = (AllFaceArray, faceArray, date) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const doc = new jsPDF(orientation, unit, size);
  doc.addImage(imageParis8, "PNG", -100, -80, 400, 310);
  doc.addImage(imageFace, "PNG", 400, -30, 200, 200);
  doc.setFont("times");
  doc.setTextColor(105, 198, 175);
  doc.text("AttendanceManagement", 430, 150);

  const title = `Rapport de présence du ${date}`;

  const headers = [["FullName", "Status"]];

  const students = createNewArray(AllFaceArray, faceArray);
  students.sort((a, b) => a.fullName.localeCompare(b.fullName));

  const data = students.map((item) => [item.fullName, item.status]);

  let content = {
    startY: 280,
    head: headers,
    body: data,
    styles: { halign: "center" },
  };

  doc.setFontSize(18);
  doc.setFont("times");
  doc.setTextColor(0, 0, 0);
  doc.text(title, 160, 230);
  doc.autoTable(content);

  doc.save("attendace_report.pdf");
};

export default exportPDF;
