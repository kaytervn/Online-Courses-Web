import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user)
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <>
      <section class="bg-dark text-light p-lg-0 pt-lg-5 text-center text-sm-start">
        <div class="container">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Find your best <span class="text-warning"> Courses </span>
              </h1>
              <h1>
                & Upgrade your <span class="text-warning"> Skill </span>
              </h1>
              <p class="lead my-4">
                We focus on teaching technology-related fields as well as honing
                skills for our students, from basic to advanced, tailored to
                each appropriate age group.
              </p>
              <a
                href="#action"
                class="btn btn-primary btn-lg"
                data-bs-toggle="modal"
              >
                Get Started
              </a>
            </div>
            <img
              class="img-fluid w-50 d-none d-sm-block d-md-block"
              src="/images/learning.png"
              alt=""
            />
          </div>
        </div>
      </section>
      <section class="bg-primary text-light p-5">
        <div class="container">
          <div class="d-md-flex justify-content-between align-items-center">
            <h2 class="mb-3 mb-md-0">
              <span class="text-warning">COOKI</span>EDU - Join Us Now!
            </h2>
          </div>
        </div>
      </section>

      <section class="p-5">
        <div class="container">
          <div class="row text-center g-4">
            <div class="col-md">
              <div class="card bg-dark text-light h-100">
                <div class="card-body text-center">
                  <div class="h1 mb-3">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </div>
                  <h3 class="card-title mb-3">Friendly Community</h3>
                  <p class="card-text">
                    Connect and interact with other leaners, exchange
                    information about study materials, and provide support in
                    answering questions.
                  </p>
                  <a href="#action" class="btn btn-primary">
                    Explore
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="card bg-secondary text-light h-100">
                <div class="card-body text-center">
                  <div class="h1 mb-3">
                    <i class="fa fa-laptop"></i>
                  </div>
                  <h3 class="card-title mb-3">Online Courses</h3>
                  <p class="card-text">
                    Online courses provide convenient and flexible learning
                    opportunities. Learners can access a wide range of
                    educational materials from anywhere.
                  </p>
                  <a href="#action" class="btn btn-dark">
                    Explore
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="card bg-dark text-light h-100">
                <div class="card-body text-center">
                  <div class="h1 mb-3">
                    <i class="fa fa-star" aria-hidden="true"></i>
                  </div>
                  <h3 class="card-title mb-3">Promise</h3>
                  <p class="card-text">
                    With a team of high-quality and passionate instructors,
                    learners will achieve the desired outcomes according to the
                    specific progression of each course.
                  </p>
                  <a href="#action" class="btn btn-primary">
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" class="p-5">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-md">
              <img src="/images/fundamentals.svg" class="img-fluid" alt="" />
            </div>
            <div class="col-md p-5">
              <h2>
                We <span class="text-warning">COOK</span> IT
              </h2>
              <p class="lead">
                This online learning platform focused on technical skills in the
                field of technology.
              </p>
              <p>
                Explore and deepen your understanding of various technical
                subjects. Our courses provide comprehensive and practical
                knowledge to help you build a solid foundation in the
                ever-evolving world of technology. Gain valuable skills, stay
                up-to-date with the latest trends, and unlock new opportunities
                in the exciting realm of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="instructors" class="p-5 bg-dark">
        <div class="container">
          <h2 class="text-center text-white">Our Instructors</h2>
          <p class="lead text-center text-white mb-5">
            Our instructors all have over 5 years ofs experience in teaching
            technical courses in the field of technology.
          </p>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="card bg-light h-100">
                <div class="card-body text-center">
                  <img
                    src="/images/ins1.svg"
                    class="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 class="card-title mb-3">Ms. Olivia</h3>
                  <p class="card-text">
                    A dedicated instructor with expertise in electrical
                    engineering and circuit design.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card bg-light h-100">
                <div class="card-body text-center">
                  <img
                    src="/images/ins2.svg"
                    class="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 class="card-title mb-3">Dr. Doofenshmirtz</h3>
                  <p class="card-text">
                    An innovative and knowledgeable professor skilled in
                    mechanical engineering and robotics.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card bg-light h-100">
                <div class="card-body text-center">
                  <img
                    src="/images/ins3.svg"
                    class="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 class="card-title mb-3">Ms. Beast</h3>
                  <p class="card-text">
                    A passionate and experienced teacher specializing in
                    computer programming and software development.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card bg-light h-100">
                <div class="card-body text-center">
                  <img
                    src="/images/ins4.svg"
                    class="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 class="card-title mb-3">Ms. Martinez</h3>
                  <p class="card-text">
                    An enthusiastic teacher with a background in civil
                    engineering, focusing on structural design and construction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="p-5">
        <div class="container">
          <h2 class="text-center mb-4">Student Feedback</h2>
          <div
            id="carouselExampleCaptions"
            class="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row align-items-center justify-content-between">
                  <div class="col-1"></div>
                  <div class="col-6">
                    <img
                      src="/images/stu1.png"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="col-4">
                    <h2>MAX SLACKER</h2>
                    <p class="lead">
                      <b>Age:</b> 17
                    </p>
                    <p>
                      "The technology engineering courses I enrolled in were
                      truly outstanding. The Software Engineering course
                      equipped me with practical software development skills and
                      taught me how to work effectively in a team. The Database
                      Management course provided a solid understanding of
                      designing and managing databases. Furthermore, the
                      Cybersecurity course shed light on the importance of
                      protecting digital assets and taught me valuable
                      techniques to secure systems. The instructors were highly
                      experienced, and the course content was engaging and
                      up-to-date. I am grateful for the knowledge gained from
                      these courses."
                    </p>
                  </div>
                  <div class="col-1"></div>
                </div>
                <div class="carousel-caption text-dark d-none d-md-block">
                  <b>Registered Courses:</b> Software Engineering, Database
                  Management, Cybersecurity
                </div>
              </div>
              <div class="carousel-item">
                <div class="row align-items-center justify-content-between">
                  <div class="col-1"></div>
                  <div class="col-6">
                    <img
                      src="/images/stu2.png"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="col-4">
                    <h2>NEEDA JOBSOON</h2>
                    <p class="lead">
                      <b>Age:</b> 20
                    </p>
                    <p>
                      "I am extremely satisfied with the technology engineering
                      courses I have taken. The Introduction to Computer Science
                      course provided a solid foundation and helped me
                      understand the core concepts. The Data Structures and
                      Algorithms course enhanced my problem-solving skills, and
                      the Machine Learning course introduced me to the
                      fascinating world of artificial intelligence. The course
                      materials were comprehensive, and the instructors were
                      knowledgeable and supportive. I feel well-prepared to
                      pursue further studies and apply these skills in
                      real-world projects."
                    </p>
                  </div>
                  <div class="col-1"></div>
                </div>
                <div class="carousel-caption text-dark d-none d-md-block">
                  <b>Registered Courses:</b> Introduction to Computer Science,
                  Data Structures and Algorithms, Machine Learning
                </div>
              </div>
              <div class="carousel-item">
                <div class="row align-items-center justify-content-between">
                  <div class="col-1"></div>
                  <div class="col-6">
                    <img
                      src="/images/stu3.png"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="col-4">
                    <h2>ADRAHMA QUEEN</h2>
                    <p class="lead">
                      <b>Age:</b> 17
                    </p>
                    <p>
                      "The technology engineering courses I completed were
                      exceptional. The Networking Fundamentals course deepened
                      my understanding of computer networks and protocols. The
                      Cloud Computing course introduced me to the concepts and
                      technologies behind cloud-based services, enabling me to
                      leverage the power of the cloud for various applications.
                      The Internet of Things course opened my eyes to the vast
                      potential of interconnected devices and taught me how to
                      develop IoT solutions. The courses were well-structured,
                      and the instructors were highly knowledgeable and
                      supportive. I am grateful for the invaluable skills gained
                      through these courses."
                    </p>
                  </div>
                  <div class="col-1"></div>
                </div>
                <div class="carousel-caption text-dark d-none d-md-block">
                  <b>Registered Courses:</b> Networking Fundamentals, Cloud
                  Computing, Internet of Things
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
