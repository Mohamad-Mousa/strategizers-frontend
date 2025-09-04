"use client";
import { useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ContactPage = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const settings = useSelector((state) => state.settings.settings);
  const banner = useSelector(
    (state) => state?.website?.data?.contactPage?.banner
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phone: {
      code: "",
      number: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneCode" || name === "phoneNumber") {
      setFormData((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          [name === "phoneCode" ? "code" : "number"]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.fullName.trim()) {
      errors.push(t("contact.errors.nameRequired"));
    }

    if (!formData.email.trim()) {
      errors.push(t("contact.errors.emailRequired"));
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push(t("contact.errors.emailInvalid"));
    }

    if (!formData.subject.trim()) {
      errors.push(t("contact.errors.subjectRequired"));
    }

    if (!formData.message.trim()) {
      errors.push(t("contact.errors.messageRequired"));
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setSubmitStatus({ type: "error", message: errors.join(", ") });
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.code === 200) {
        setSubmitStatus({
          type: "success",
          message: t("contact.successMessage"),
        });
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          phone: {
            code: "",
            number: "",
          },
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || t("contact.errorMessage"),
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: t("contact.networkError"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{t("contact.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="get-touch-area">
        <div className="container">
          <div className="sec-title text-center">
            <h1>{t("contact.getInTouch")}</h1>
            <span className="border-center"></span>
            <p>{t("contact.description")}</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Card
                title={t("contact.visitUs")}
                description={settings?.contact?.address}
                icon="flaticon-magnifying-glass"
              />
            </div>
            <div className="col-md-4">
              <Card
                title={t("contact.callUs")}
                description={`+${settings?.contact?.phone?.code} ${settings?.contact?.phone?.number}`}
                icon="flaticon-telephone"
              />
            </div>
            <div className="col-md-4">
              <Card
                title={t("contact.emailUs")}
                description={settings?.contact?.email}
                icon="flaticon-clock"
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
                  <h1>{t("contact.sendMessage")}</h1>
                  <span className="border"></span>
                </div>

                {/* Status Messages */}
                {submitStatus && (
                  <div
                    className={`alert alert-${
                      submitStatus.type === "success" ? "success" : "danger"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form
                  id="contact-form"
                  name="contact_form"
                  className="default-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="fullName"
                        placeholder={t("contact.form.name")}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        placeholder={t("contact.form.email")}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="phone-input-group">
                        <input
                          type="text"
                          name="phoneCode"
                          placeholder={t("contact.form.phoneCode")}
                          value={formData.phone.code}
                          onChange={handleInputChange}
                          className="phone-code"
                        />
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder={t("contact.form.phoneNumber")}
                          value={formData.phone.number}
                          onChange={handleInputChange}
                          className="phone-number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="subject"
                        placeholder={t("contact.form.subject")}
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        placeholder={t("contact.form.message")}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="thm-btn bgclr-1"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <i className="fa fa-spinner fa-spin"></i>
                            {t("contact.form.sending")}
                          </>
                        ) : (
                          t("contact.form.sendMessage")
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="contact-author-info">
                <div className="sec-title pdb-50">
                  <h1>{t("contact.yourContact")}</h1>
                  <span className="border"></span>
                </div>
                <ul>
                  {settings?.contactTeam &&
                    settings?.contactTeam?.length > 0 &&
                    settings?.contactTeam?.map((item) => (
                      <li>
                        <div className="title">
                          <h3>
                            {locale === "en"
                              ? item?.position?.en
                              : item?.position?.ar}
                          </h3>
                        </div>
                        <div className="img-holder">
                          <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${item?.image}`}
                            alt={item?.name?.[locale]}
                            style={{
                              width: "2200px",
                              height: "100px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="text-holder">
                          <h5>
                            {locale === "en" ? item?.name?.en : item?.name?.ar}
                          </h5>
                          <p>
                            <span className="flaticon-telephone"></span>+
                            {item?.phone?.code} {item?.phone?.number}
                          </p>
                          <p>
                            <span className="flaticon-back"></span>
                            {item?.email}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-map-area"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="container-fluid">
          <div
            className="google-map-inner"
            style={{
              width: "100%",
              height: "440px",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: settings?.contact?.map,
              }}
              style={{
                width: "100%",
                height: "440px",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
