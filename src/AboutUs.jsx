import React, { useState, useEffect } from "react";

export default function NepalTermsAndAgreementPage() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("overview");

  // Function to handle smooth scrolling to sections and update active section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  // Helper function to determine if a section button should be active
  const getButtonStyles = (sectionId) => {
    return activeSection === sectionId
      ? "w-full text-left p-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors"
      : "w-full text-left p-2 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors";
  };

  // Add scroll event listener to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "eligibility",
        "reservation",
        "vehicle",
        "payment",
        "insurance",
        "termination",
        "privacy",
      ];

      // Find which section is currently most visible in the viewport
      let currentSectionId = sections[0];
      let maxVisibility = 0;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const visibility = Math.max(0, visibleHeight / section.offsetHeight);

          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSectionId = sectionId;
          }
        }
      });

      setActiveSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 mt-24 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center">
              <div className="text-4xl mr-4">🛡️</div>
              <h1 className="text-4xl font-bold">Terms and Agreement</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">
              We value transparency. Our terms are designed to protect both you
              and vendors while ensuring a smooth vehicle rental experience in
              Nepal.
            </p>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg inline-block">
              <p className="text-sm">Last Updated: April 10, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Navigation Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-4 bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">
                Quick Navigation
              </h3>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => scrollToSection("overview")}
                      className={getButtonStyles("overview")}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("eligibility")}
                      className={getButtonStyles("eligibility")}
                    >
                      Eligibility Requirements
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("reservation")}
                      className={getButtonStyles("reservation")}
                    >
                      Reservation & Cancellation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("vehicle")}
                      className={getButtonStyles("vehicle")}
                    >
                      Vehicle Usage
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("payment")}
                      className={getButtonStyles("payment")}
                    >
                      Payment Terms
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("insurance")}
                      className={getButtonStyles("insurance")}
                    >
                      Insurance
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("termination")}
                      className={getButtonStyles("termination")}
                    >
                      Termination
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("privacy")}
                      className={getButtonStyles("privacy")}
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {/* Overview Section */}
              <section id="overview" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">📋</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <p className="text-gray-700 mb-4">
                    Welcome to our Nepal Vehicle Rental Service. These Terms and
                    Conditions ("Terms") govern your use of our vehicle rental
                    services, including our website, mobile application, and all
                    related services (collectively, the "Service"). By accessing
                    or using our Service, you agree to be bound by these Terms.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Our Service allows you to rent vehicles for personal or
                    business use on a long-term basis in Nepal. These Terms
                    constitute a legally binding agreement between you ("User,"
                    "you," or "your") and our company ("Company," "we," "us," or
                    "our").
                  </p>
                  <p className="text-gray-700">
                    Please read these Terms carefully. If you do not agree with
                    these Terms, you must not access or use our Service. By
                    using our Service, you represent that you are at least 18
                    years old and capable of forming a binding contract.
                  </p>
                </div>
              </section>

              {/* Eligibility Requirements Section */}
              <section id="eligibility" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">✓</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Eligibility Requirements
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      To rent a vehicle, you must:
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Be at least 18 years of age
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Possess a valid Nepali driver's license or international
                        driving permit
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Provide a valid identification proof (citizenship,
                        passport)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Be covered by the vehicle's insurance policy
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Have proof of local residence or hotel accommodation in
                        Nepal
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 mb-4">
                    We reserve the right to refuse service to anyone for any
                    reason at our discretion, particularly if we have concerns
                    about the safety of our vehicles or other customers.
                  </p>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center text-yellow-700 mb-2">
                      <div className="mr-2">⚠️</div>
                      <h4 className="font-medium">Important Notice</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Providing false information regarding your eligibility may
                      result in immediate termination of your rental agreement
                      and potential legal consequences.
                    </p>
                  </div>
                </div>
              </section>

              {/* Reservation & Cancellation Section */}
              <section id="reservation" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">📅</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Reservation & Cancellation
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Reservations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    All reservations are subject to vehicle availability. While
                    we make every effort to provide the specific vehicle model
                    you reserve, we reserve the right to substitute a comparable
                    vehicle if necessary. The reservation is only confirmed once
                    you receive a confirmation notification from us.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Cancellation Policy
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Customer Cancellations
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Customers can cancel their reservation at any time with no
                      penalty. We maintain a flexible cancellation policy to
                      ensure customer satisfaction.
                    </p>

                    <h4 className="font-medium text-gray-800 mb-2">
                      Vendor Cancellations
                    </h4>
                    <p className="text-gray-700">
                      Vendors may cancel a reservation only after two hours of
                      approval. If a vendor cancels a reservation, customers
                      will be offered a comparable vehicle or a full refund of
                      any advance payments made.
                    </p>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Rental Duration
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The minimum rental duration is 1 day (24 hours). If you book
                    a vehicle for less than 24 hours (e.g., 13 hours), you will
                    still be charged for a full day. This policy applies to all
                    vehicle types in our fleet.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Modifications
                  </h3>
                  <p className="text-gray-700">
                    Reservation modifications are subject to vehicle
                    availability. There will be no price adjustments for
                    modifications as we maintain fixed pricing for each vehicle
                    category. Extensions must be requested and approved before
                    the scheduled return time.
                  </p>
                </div>
              </section>

              {/* Vehicle Usage Section */}
              <section id="vehicle" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">🚗</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Vehicle Usage
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <p className="text-gray-700 mb-4">
                    The rental vehicle must only be operated by the authorized
                    driver(s) named in the rental agreement. Unauthorized
                    drivers are not covered by insurance and may void all
                    protections.
                  </p>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
                    <h3 className="font-semibold text-red-700 mb-2">
                      Prohibited Uses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-red-700 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Driving under influence of alcohol/drugs</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Using for illegal activities</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Off-road driving (unless specified)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Towing or pushing vehicles</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Racing or speed testing</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✕</span>
                        <span>Transporting hazardous materials</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Long-Term Usage
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our service is designed for long-term vehicle rentals in
                    Nepal. We offer competitive rates for rentals extending
                    beyond one week, with special discounts for monthly and
                    quarterly rentals.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Fuel Policy
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Vehicles must be returned with the same fuel level as at
                    pickup. If returned with less fuel, you will be charged the
                    current market rate plus a service fee.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Vehicle Condition
                  </h3>
                  <p className="text-gray-700">
                    You are responsible for returning the vehicle in the same
                    condition as when you received it, except for normal wear
                    and tear. Additional cleaning fees may apply for excessive
                    dirt or other conditions requiring special cleaning.
                  </p>
                </div>
              </section>

              {/* Payment Terms Section */}
              <section id="payment" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">💸</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Payment Terms
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Payment Method
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We accept cash payments after the completion of your vehicle
                    trip. Payment is to be made in Nepali Rupees (NPR) only.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Fixed Pricing
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We maintain fixed pricing for all vehicle categories. The
                    price will not change during your rental period, even if
                    modifications are made to the reservation.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Security Deposit
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A refundable security deposit may be required at the time of
                    vehicle pickup. This deposit will be fully refunded upon
                    vehicle return, subject to the vehicle being returned in the
                    same condition as when rented.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Additional Charges
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Late return fees:</span>{" "}
                          Additional day charge for returns after scheduled time
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Refueling charge:</span>{" "}
                          Current market rate plus service fee
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">
                            Excessive cleaning:
                          </span>{" "}
                          Additional charge depending on condition
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">
                            Traffic/parking violations:
                          </span>{" "}
                          Actual fine amount plus administrative fee
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Insurance Section */}
              <section id="insurance" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">🛡️</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Insurance
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Vehicle Insurance
                  </h3>
                  <p className="text-gray-700 mb-4">
                    All vehicles come with basic insurance coverage as required
                    by Nepali law. This insurance is included in the rental
                    price and covers basic liability for third-party injuries
                    and property damage.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Your Liability
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Despite the insurance coverage, you are responsible for:
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4 pl-4">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Damage caused by negligence or prohibited use
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Loss of vehicle parts or accessories
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Administrative fees related to claims processing
                    </li>
                  </ul>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center text-yellow-700 mb-2">
                      <div className="mr-2">⚠️</div>
                      <h4 className="font-medium">Important</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Insurance coverage is void if the vehicle is used in
                      violation of the rental agreement, including unauthorized
                      drivers or prohibited uses.
                    </p>
                  </div>
                </div>
              </section>

              {/* Termination Section */}
              <section id="termination" className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-xl font-bold text-indigo-600">!</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Termination
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <p className="text-gray-700 mb-4">
                    We reserve the right to terminate your rental agreement
                    immediately and repossess the vehicle without notice if:
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4 pl-4">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      You have provided fraudulent information
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      The vehicle is used in a prohibited manner
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      You allow an unauthorized driver to operate the vehicle
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      You abandon the vehicle
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      You fail to return the vehicle on the agreed date without
                      authorization
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    In the event of termination due to breach of agreement, you
                    will be responsible for all rental fees, recovery costs, and
                    any damages incurred.
                  </p>
                </div>
              </section>

              {/* Privacy Policy Section */}
              <section id="privacy" className="mb-6">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <div className="text-2xl text-indigo-600">🔒</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Privacy Policy
                  </h2>
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  <p className="text-gray-700 mb-4">
                    We collect and process personal information in accordance
                    with our Privacy Policy, which is incorporated by reference
                    into these Terms. By using our Service, you consent to our
                    data practices as described in the Privacy Policy.
                  </p>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    Information We Collect
                  </h3>
                  <ul className="space-y-2 text-gray-700 mb-4 pl-4">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Personal identification information (name, address, phone
                      number)
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Payment information
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Driver's license and identification details
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Vehicle usage data during the rental period
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    For complete details on how we collect, use, and protect
                    your information, please refer to our full Privacy Policy
                    document available on our website.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
