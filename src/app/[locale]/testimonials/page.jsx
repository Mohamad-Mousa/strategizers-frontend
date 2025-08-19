const TestimonialsPage = () => {
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
                <h1>Testimonials</h1>
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
                  <li className="active">Testimonials</li>
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

      <section className="testimonial-section sec-padding">
        <div className="container">
          <div className="row masonary-layout">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="col-md-3 col-sm-6 col-xs-12">
                <div className="single-testimonial-item">
                  <div className="img-holder">
                    <img src="/images/testimonial/1.png" alt="Awesome Image" />
                  </div>
                  <div className="text-holder">
                    <p>
                      Who loves or pursues or desires to obtain pain of itself,
                      because it can procure great pleasure.
                    </p>
                  </div>
                  <div className="client-info">
                    <h3>Allen Duckeat</h3>
                    <p>Newyork</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title pull-left">
                <h3>
                  Over 20 years of experience we’ll ensure you get the best
                  guidance.
                </h3>
              </div>
              <div className="button pull-right">
                <a className="thm-btn bgclr-1" href="#">
                  Request Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsPage;
