const ServicesPage = () => {
  return (
    <>
      <section
        className="breadcrumb-area"
        style={{ backgroundImage: "url(/images/resources/breadcrumb-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>Services</h1>
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
                  <li className="active">Services</li>
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
      <section className="service-page-area sec-padding">
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="col-md-4 col-sm-12 col-xs-12">
                <div
                  className="single-service-item text-center wow fadeInUp"
                  data-wow-delay="0s"
                  data-wow-duration="1s"
                  data-wow-offset="0"
                >
                  <div className="img-holder">
                    <img src="/images/services/1.jpg" alt="Awesome Image" />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="business-growth.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-holder">
                    <div className="text">
                      <a href="business-growth.html">
                        <h3 className="title">Business Growth</h3>
                      </a>
                      <p>
                        The process of improving some measure of an enterprise's
                        success. Business growth can be a achieved either.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
