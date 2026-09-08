import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const features = [
    {
        title: "Cost-Effective Solutions",
        text: "Work with talented CS students on top-notch development without breaking the bank.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M9.5 9h4a2 2 0 0 1 0 4h-3a2 2 0 0 0 0 4h4" />
            </svg>
        ),
    },
    {
        title: "Supporting Developers",
        text: "Invest in the future of tech — collaborate with students and help nurture the industry's next generation.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: "Built-In Collaboration",
        text: "Message providers, track requests, submit work, and pay all in one place — no juggling tools.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        title: "Freedom & Flexibility",
        text: "Flexible timelines and scope options for small businesses — focus on your core work, we handle the build.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                <path d="M12 3v18M3 12h18M12 3l-3.5 3.5M12 3l3.5 3.5M12 21l-3.5-3.5M12 21l3.5-3.5M3 12l3.5-3.5M3 12l3.5 3.5M21 12l-3.5-3.5M21 12l-3.5 3.5" />
            </svg>
        ),
    },
];

const steps = [
    { title: "Browse", text: "Explore service listings and pick a developer whose skills fit your project." },
    { title: "Request", text: "Send a request with your budget, timeline, and project details." },
    { title: "Collaborate", text: "Chat with your developer, track progress, and review their work." },
    { title: "Pay & Review", text: "Pay once you're happy, then leave a rating to help others." },
];

function App() {
    return (
        <div>
            <Navbar />

            <header className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <p className="hero-eyebrow">Software, built by CS students</p>
                            <h1 className="hero-title">
                                Affordable development for small businesses.
                            </h1>
                            <p className="hero-subtitle">
                                Propello connects small businesses and startups with talented computer
                                science students — cost-effective solutions without sacrificing quality,
                                with chat, task tracking, and payments built in.
                            </p>
                            <div className="hero-actions">
                                <a className="btn hero-button" href="/explore">Explore Services</a>
                                <a className="btn hero-button-outline" href="#how">How it Works</a>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="hero-card">
                                <div className="hero-card-head">
                                    <span className="hero-card-title">Web Development</span>
                                    <span className="hero-card-price">$120</span>
                                </div>
                                <p className="hero-card-desc">Responsive company website with CMS, built in 2 weeks with weekly check-ins.</p>
                                <div className="hero-card-meta">
                                    <span className="hero-card-avatar">JS</span>
                                    <span>Sam Rivera</span>
                                    <span className="stars ml-auto">
                                        <span className="star filled">★</span>
                                        <span className="star filled">★</span>
                                        <span className="star filled">★</span>
                                        <span className="star filled">★</span>
                                        <span className="star">★</span>
                                        <span className="star-count ml-1">4.8 (12)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="stats-bar">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="stat-value">1:1</div>
                            <div className="stat-label">Direct collaboration with your developer</div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-value">~50%</div>
                            <div className="stat-label">Typical savings vs. agency rates</div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-value">Built-in</div>
                            <div className="stat-label">Chat, task tracking & secure payments</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section" id="about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <p className="section-eyebrow">About Propello</p>
                            <h2 className="customh2">Why Propello?</h2>
                        </div>
                        <div className="col-lg-6">
                            <p className="section-text">
                                Propello bridges small businesses and young tech minds, sparking innovation
                                and unleashing possibilities. We empower businesses with cost-effective
                                solutions while nurturing the next generation of tech leaders — all on one
                                platform that handles the entire engagement, from first message to final payment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section content-section-alt" id="features">
                <div className="container">
                    <div className="feature-grid">
                        {features.map((feature) => (
                            <div className="feature-card" key={feature.title}>
                                <div className="feature-icon-wrap">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="content-section" id="how">
                <div className="container">
                    <div className="text-center mb-5">
                        <p className="section-eyebrow">Getting started</p>
                        <h2 className="customh2">How It Works</h2>
                    </div>
                    <div className="step-grid">
                        {steps.map((step, index) => (
                            <div className="step-card" key={step.title}>
                                <div className="step-number">{index + 1}</div>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="container text-center">
                    <h2 className="cta-title">Ready to get started?</h2>
                    <p className="cta-text">Browse services or offer your own — join Propello today.</p>
                    <div className="cta-actions">
                        <a className="btn cta-button" href="/explore">Browse Services</a>
                        <a className="btn cta-button-outline" href="/signup">Sign Up Free</a>
                    </div>
                </div>
            </section>

            <section className="content-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <p className="section-eyebrow">Support</p>
                        <h2 className="customh2">FAQ</h2>
                    </div>
                    <div id="accordion" className="faq">
                        <div className="card faq-item">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link w-100 h-100 text-left" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        How does Propello ensure the quality of work delivered by students?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    Students can offer the services they're best at, and past clients rate
                                    their work on every completed task — so you can pick developers with
                                    proven track records and leave your own review after a job well done.
                                </div>
                            </div>
                        </div>
                        <div className="card faq-item">
                            <div className="card-header" id="headingTwo">
                                <h5 className="mb-0">
                                    <button className="btn btn-link collapsed w-100 h-100 text-left" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        What types of projects can I request on Propello?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                    Propello offers web development, automation scripts, iOS and Android
                                    development, and small testing tasks. Whatever your tech needs, our
                                    students are eager to help.
                                </div>
                            </div>
                        </div>
                        <div className="card faq-item">
                            <div className="card-header" id="headingThree">
                                <h5 className="mb-0">
                                    <button className="btn btn-link collapsed w-100 h-100 text-left" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        How are projects priced on Propello?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div className="card-body">
                                    Providers list a price for their service, and you make an offer when
                                    you request. You pay through Propello once the work has been delivered,
                                    at a fraction of typical agency rates.
                                </div>
                            </div>
                        </div>
                        <div className="card faq-item">
                            <div className="card-header" id="headingFour">
                                <h5 className="mb-0">
                                    <button className="btn btn-link collapsed w-100 h-100 text-left" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Can I hire a student developer for a long-term project?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                <div className="card-body">
                                    Absolutely — Propello welcomes both short-term and long-term projects.
                                    Whether you need a one-time task or ongoing support, students are ready
                                    to collaborate according to your requirements.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default App;