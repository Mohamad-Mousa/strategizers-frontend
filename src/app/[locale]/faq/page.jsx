const FaqPage = () => {
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
                <h1>Frequently Asked Questions</h1>
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
                  <li className="active">FAQ’s</li>
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
      <section className="faq-content-area sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="accordion-box">
                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>What is the procedure to join with your company?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn active">
                    <h4>Do you give any offer for premium customer?</h4>
                  </div>
                  <div className="accord-content collapsed">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>What makes you special from others?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>Why Would a Successful Entrepreneur Hire a Coach?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>What kind of financial advice do you give?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>Waht makes your financial projects special?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>How long will take us to raise capital?</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>

                <div className="accordion last accordion-block">
                  <div className="accord-btn last">
                    <h4>
                      Can I offer my items for free on a promotional basis?
                    </h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      The master-builder of human happiness one rejects,
                      dislikes sed avoid packages and web page editors now use
                      uncover.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="question-form">
                <div className="title">
                  <h3>Ask Your Questions</h3>
                </div>
                <form id="faq-form" action="#">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input type="text" name="subject" placeholder="Subject" />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="question"
                        placeholder="Your Questions..."
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <button className="thm-btn bgclr-1" type="submit">
                        Submit Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
