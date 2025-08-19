import Card from "../../../components/Card";

const ContactPage = () => {
  return (
    <>
      <section
        className="breadcrumb-area"
        style={{ backgroundImage: "url(images/resources/breadcrumb-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="breadcrumb-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="left pull-left">
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </li>
                  <li className="active">Contact Us</li>
                </ul>
              </div>
              <div className="right pull-right">
                <a href="#">
                  <span>
                    <i className="fa fa-share-alt" aria-hidden="true"></i>Share
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="get-touch-area">
        <div className="container">
          <div className="sec-title text-center">
            <h1>Get Touch With Us</h1>
            <span className="border-center"></span>
            <p>
              We recently helped a small business grow from break-even to over
              $1m profit in less than 2 years. Please find below contact details
              and contact us today!
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Card
                title="Visit Our Place"
                description="241/84 Theme Name Discover Street New York, NY 10012, USA"
                icon="flaticon-magnifying-glass"
              />
            </div>
            <div className="col-md-4">
              <Card
                title="Visit Our Place"
                description="241/84 Theme Name Discover Street New York, NY 10012, USA"
                icon="flaticon-magnifying-glass"
              />
            </div>
            <div className="col-md-4">
              <Card
                title="Visit Our Place"
                description="241/84 Theme Name Discover Street New York, NY 10012, USA"
                icon="flaticon-magnifying-glass"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="contact-form">
                <div className="sec-title pdb-50">
                  <h1>Send Your Mesage Us</h1>
                  <span className="border"></span>
                </div>
                <form
                  id="contact-form"
                  name="contact_form"
                  className="default-form"
                  action="inc/sendmail.php"
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="form_name"
                        placeholder="Your Name*"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="form_email"
                        placeholder="Your Mail*"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="form_phone"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="form_subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        name="form_message"
                        placeholder="Your Message.."
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        id="form_botcheck"
                        name="form_botcheck"
                        className="form-control"
                        type="hidden"
                      />
                      <button
                        className="thm-btn bgclr-1"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        send message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="contact-author-info">
                <div className="sec-title pdb-50">
                  <h1>Your Contact</h1>
                  <span className="border"></span>
                </div>
                <ul>
                  <li>
                    <div className="title">
                      <h3>Human Resource:</h3>
                    </div>
                    <div className="img-holder">
                      <img src="/images/resources/contact-1.jpg" alt="" />
                    </div>
                    <div className="text-holder">
                      <h5>Charles Mecky</h5>
                      <p>
                        <span className="flaticon-telephone"></span>84578-25-658
                      </p>
                      <p>
                        <span className="flaticon-back"></span>
                        Charlesmeck@gmail.com
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="title">
                      <h3>Sales Department:</h3>
                    </div>
                    <div className="img-holder">
                      <img src="/images/resources/contact-2.jpg" alt="" />
                    </div>
                    <div className="text-holder">
                      <h5>Robert Fertly</h5>
                      <p>
                        <span className="flaticon-telephone"></span>98765-43-210
                      </p>
                      <p>
                        <span className="flaticon-back"></span>
                        Robertfert@gmail.com
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-map-area">
        <div className="container-fluid">
          <div className="google-map-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15247.333825976364!2d35.825970514375555!3d34.43248262287867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f6ab9db89d33%3A0x323c52527dde8578!2sTripoli!5e0!3m2!1sen!2slb!4v1755435912344!5m2!1sen!2slb"
              width="800"
              height="600"
              style={{ border: 0, width: "100%", height: "440px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
