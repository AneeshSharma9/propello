import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
                <Navbar />
                <div className="image-container">
                    <img
                        src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                        className="w-100"
                        alt=""
                    />
                    <span className="title">Propello</span>
                    <span className="tagline">Spark innovation together.</span>
                    <div className="homepage-button1">
                        <a className="main-button" href="#about">
                            About
                        </a>
                    </div>
                    <div className="homepage-button2">
                        <a className="other-button" href="#how">
                            How it Works
                        </a>
                    </div>
                </div>

                <div id="about"></div>
                <div className="section-bg" style={{ marginTop: '-2rem', position: 'relative', zIndex: 2 }}>
                    <h2 className="customh2 text-center pt-2">About Propello</h2>
                    <p className="introtext pb-2">
                        Propello bridges businesses and young tech minds, sparking innovation and
                        unleashing boundless possibilities. We empower small businesses by connecting
                        them with talented computer science students, providing cost-effective solutions
                        while nurturing the next generation of tech leaders. Join our vibrant community
                        of visionaries and changemakers today.
                    </p>
                </div>

                <div className="text-center" style={{ paddingTop: '3rem', paddingBottom: '0.5rem' }}>
                    <h2 className="customh2">Why Propello?</h2>
                </div>
                <div className="homepage-card-container">
                    <div className="card homepage-card">
                        <h5 className="card-title text-center mb-3">Cost-Effective Solutions</h5>
                        <p className="card-text">Access top-notch development services without
                            breaking the bank. Work with talented CS students for cost-effective
                            solutions tailored to your specific needs.</p>
                    </div>
                    <div className="card homepage-card">
                        <h5 className="card-title text-center mb-3">Supporting Developers</h5>
                        <p className="card-text">You're investing in the future of the tech industry.
                            Collaborate with enthusiastic students and play a role in nurturing their
                            growth as the tech superstars of tomorrow.</p>
                    </div>
                    <div className="card homepage-card">
                        <h5 className="card-title text-center mb-3">Freedom & Flexibility</h5>
                        <p className="card-text">We offer flexible timelines and options for small
                            businesses. Choose the best fit for your project and enjoy the freedom
                            to focus on your core business.</p>
                    </div>
                    <div className="card homepage-card">
                        <h5 className="card-title text-center mb-3">Empowering Collaboration</h5>
                        <p className="card-text">A vibrant community of businesses and students,
                            encouraging collaboration and innovation. Together, we create solutions
                            that drive positive change.</p>
                    </div>
                </div>

                <div className="homepage-offset" id="how"></div>
                <div className="section-bg">
                    <h2 className="customh2 text-center pt-2">
                        How Does it Work?
                    </h2>
                    <div className="introtext pb-3">
                        <p><strong>1. Register</strong> &mdash; Sign up on Propello with basic
                            information about your company and project needs.</p>
                        <p><strong>2. Submit Your Project</strong> &mdash; Outline your project's
                            scope, requirements, and desired skills through the dashboard.</p>
                        <p><strong>3. Get Matched</strong> &mdash; Our intelligent algorithm identifies
                            the most suitable student developers based on their skills and experience.</p>
                        <p><strong>4. Review & Select</strong> &mdash; Browse student profiles and
                            proposals, then choose the candidate that best fits your vision.</p>
                        <p><strong>5. Collaborate</strong> &mdash; Work closely with your developer,
                            set milestones, and communicate seamlessly throughout the process.</p>
                        <p><strong>6. Complete & Review</strong> &mdash; Review deliverables, provide
                            feedback, and leave a rating to help future businesses.</p>
                    </div>
                </div>

                <div className="text-center" style={{ paddingTop: '3rem', paddingBottom: '0.5rem' }}>
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
                                We maintain a rigorous selection process for our student developers,
                                ensuring they possess the necessary skills and expertise. Additionally,
                                we encourage businesses to provide feedback on the projects, and our team
                                offers support and guidance throughout the development process.
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
                                Propello offers a wide range of services, including website development,
                                automation scripts, iOS and Android development, and tackling small tasks.
                                Whatever your tech-related needs are, our students are eager to help.
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
                                Projects on Propello are priced at a fraction of the cost of professional
                                services. The exact pricing depends on the complexity and scope of the
                                project. Our aim is to provide affordable solutions for small businesses
                                while ensuring fair compensation for students.
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
                                Absolutely! Propello welcomes both short-term and long-term projects.
                                Whether you need a one-time task or ongoing development support, our
                                students are ready to collaborate according to your requirements.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default App;
