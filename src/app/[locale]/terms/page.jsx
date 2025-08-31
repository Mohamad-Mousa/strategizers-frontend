"use client";
import { useParams } from "next/navigation";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector } from "react-redux";

const TermsPage = () => {
  const { locale } = useParams();
  const { t } = useTranslation();

  const { settings } = useSelector((state) => state.settings);
  const banner = useSelector(
    (state) => state?.website?.data?.contactPage?.banner
  );

  console.log({ settings });

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(${"http://localhost:4000/" + banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>
                  {locale === "en" ? "Terms And Coditions" : "الشروط والأحكام"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="privacy-policy-area sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="privacy-content"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === "en"
                      ? settings?.legal?.termsAndConditions?.en
                      : settings?.legal?.termsAndConditions?.ar,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
