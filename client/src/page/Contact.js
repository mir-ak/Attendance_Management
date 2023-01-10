import React from "react";
import Navigation from "../components/Navigation";

import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/Contact.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toastifySuccess = () => {
    toast.success("Message envoyé merci :)", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const onSubmit = async (data) => {
    const { name, company, phone, email, message } = data;

    const templateParams = {
      name,
      company,
      phone,
      email,
      message,
    };
    emailjs.init("7M9cumyqzdMgRiihN");
    emailjs.send("service_5ql43gy", "template_px1fvej", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        reset();
        toastifySuccess();
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };

  return (
    <div>
      <div className="contact">
        <Navigation />
        <div className="contactContent">
          <div className="header">
            <div className="contactBox">
              <form
                id="orm-content"
                onSubmit={handleSubmit(onSubmit)}
                noValidate>
                <div className="contact-form">
                  <h2>Contact-Us</h2>
                  <input
                    type="text"
                    name="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter your name",
                      },
                      maxLength: {
                        value: 50,
                        message: "Please enter 50 caracters or less",
                      },
                    })}
                    placeholder="Name *"
                    autoComplete="off"></input>
                  {errors.name && (
                    <span className="errorMessage">{errors.name.message}</span>
                  )}
                  <input
                    type="text"
                    name="company"
                    {...register("company", {
                      required: {
                        value: true,
                        message: "Please enter a company name",
                      },
                      maxLength: {
                        value: 50,
                        message: "Please enter 50 caracters or less",
                      },
                    })}
                    placeholder="Company Name *"></input>
                  {errors.company && (
                    <span className="errorMessage">
                      &nbsp;{errors.company.message}
                    </span>
                  )}
                  <input
                    type="number"
                    name="phone"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Please enter a phone number",
                        pattern: /^[0-0]{1}[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}$/g,
                      },
                      minLength: {
                        value: 10,
                        message: "Please enter 10 digits at least ",
                      },
                      maxLength: {
                        value: 12,
                        message: "Please enter 12 digits ",
                      },
                    })}
                    placeholder="Phone Number *"></input>
                  {errors.phone && (
                    <span className="errorMessage">{errors.phone.message}</span>
                  )}
                  <input
                    column={2}
                    type="email"
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                    placeholder="Email *"></input>
                  {errors.email && (
                    <span className="errorMessage">
                      Please enter a valid email address
                    </span>
                  )}
                  <textarea
                    rows={3}
                    name="message"
                    {...register("message", {
                      required: true,
                    })}
                    placeholder="Message *"></textarea>
                  {errors.message && (
                    <span className="errorMessage">Please enter a message</span>
                  )}
                  <input className="button" type="submit" value="Submit" />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
