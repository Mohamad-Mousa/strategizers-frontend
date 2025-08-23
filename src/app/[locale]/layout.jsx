"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "../../components/LanguageProvider";
import { Provider } from "react-redux";
import { store } from "../../store";
import Script from "next/script";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DataLoader from "../../components/DataLoader";
import { use } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({ children, params }) {
  const { locale } = use(params);
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon/favicon-16x16.png"
          sizes="16x16"
        />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <LanguageProvider defaultLocale={locale}>
            <DataLoader>
              <div
                className="boxed_wrapper"
                style={{
                  direction: isRTL ? "rtl" : "ltr",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <Header />
                {children}
                <div
                  className="scroll-to-top scroll-to-target"
                  data-target="html"
                >
                  <span className="fa fa-chevron-circle-up"></span>
                </div>
                <Footer />
              </div>
            </DataLoader>
          </LanguageProvider>
        </Provider>
        <Script src="/js/jquery-1.12.4.min.js" strategy="beforeInteractive" />
        <Script src="/js/wow.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.bxslider.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.countTo.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="beforeInteractive" />
        <Script src="/js/validation.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.mixitup.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.easing.min.js" strategy="beforeInteractive" />
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzPSV2jshbjI8fqnC_C4L08ffnj5EN3A"
          strategy="beforeInteractive"
        />
        <Script src="/js/gmaps.js" strategy="beforeInteractive" />
        <Script src="/js/map-helper.js" strategy="beforeInteractive" />
        <Script
          src="/js/jquery.fancybox.pack.js"
          strategy="beforeInteractive"
        />
        <Script src="/js/jquery.appear.js" strategy="beforeInteractive" />
        <Script src="/js/isotope.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.prettyPhoto.js" strategy="beforeInteractive" />
        <Script
          src="/js/jquery.bootstrap-touchspin.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/timepicker/timePicker.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/bootstrap-sl-1.12.1/bootstrap-select.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/jquery-ui-1.11.4/jquery-ui.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/language-switcher/jquery.polyglot.language.switcher.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/html5lightbox/html5lightbox.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/jquery.themepunch.tools.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/jquery.themepunch.revolution.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.actions.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.carousel.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.kenburn.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.layeranimation.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.migration.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.navigation.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.parallax.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.slideanims.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/revolution/js/extensions/revolution.extension.video.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/js/custom.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
