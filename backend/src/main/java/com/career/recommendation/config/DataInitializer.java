package com.career.recommendation.config;

import com.career.recommendation.entity.Skill;
import com.career.recommendation.entity.Career;
import com.career.recommendation.entity.User;
import com.career.recommendation.entity.Course;
import com.career.recommendation.repository.CourseRepository;
import com.career.recommendation.repository.UserRepository;
import com.career.recommendation.repository.SkillRepository;
import com.career.recommendation.repository.CareerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private CourseRepository courseRepository;

        @Autowired
        private SkillRepository skillRepository;

        @Autowired
        private CareerRepository careerRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                // Seed Admin User
                if (userRepository.findByEmail("admin@career.com").isEmpty()) {
                        User admin = new User();
                        admin.setUsername("Admin User");

                        admin.setEmail("admin@career.com");
                        admin.setPassword(passwordEncoder.encode("admin123"));
                        admin.setRole("ADMIN");
                        userRepository.save(admin);
                        System.out.println("Seeded Admin User: admin@career.com / admin123");
                }

                // Seed Courses
                if (courseRepository.count() == 0) {
                        List<Course> courses = Arrays.asList(
                                        new Course(
                                                        "Full Stack Web Development",
                                                        "Learn to build modern web applications using React, Spring Boot, and MySQL.",
                                                        "Intermediate",
                                                        "12 Weeks",
                                                        "https://www.youtube.com/watch?v=F4zr1aMevB4",
                                                        Arrays.asList("React", "Java", "Spring Boot", "MySQL")),
                                        new Course(
                                                        "Data Structures & Algorithms",
                                                        "Master the fundamental building blocks of computer science and ace your coding interviews.",
                                                        "Advanced",
                                                        "8 Weeks",
                                                        "https://www.youtube.com/playlist?list=PLOSWfejHYTlgj010qjM8KkFh0pA_X9I4b", // DSA
                                                                                                                                    // (Example)
                                                        Arrays.asList("Java", "Algorithms", "Data Structures")),
                                        new Course(
                                                        "Python for Data Science",
                                                        "Introduction to Python programming and its applications in Data Science and Machine Learning.",
                                                        "Beginner",
                                                        "6 Weeks",
                                                        "https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_", // Python
                                                                                                                                    // (Example)
                                                        Arrays.asList("Python", "Pandas", "Machine Learning")),
                                        new Course(
                                                        "Introduction to Java",
                                                        "A comprehensive guide to Java programming language for beginners.",
                                                        "Beginner",
                                                        "4 Weeks",
                                                        "https://www.youtube.com/playlist?list=PLsyeobzWxl7oZbpa2SVbHQ5APrS7sWbN", // Telusko
                                                                                                                                   // Java
                                                                                                                                   // (Example)
                                                        Arrays.asList("Java", "OOP")));
                        courseRepository.saveAll(courses);
                        System.out.println("Seeded 4 Default Courses");
                }

                // Seed Skills
                if (skillRepository.count() == 0) {
                        List<Skill> skillsList = Arrays.asList(
                                        createSkill("Java", "Core Java programming including OOP concepts.", 600),
                                        createSkill("React", "Modern frontend library for building user interfaces.",
                                                        450),
                                        createSkill("Spring Boot", "Enterprise-grade backend framework for Java.", 500),
                                        createSkill("Python", "Versatile language for data science and automation.",
                                                        400),
                                        createSkill("Data Structures",
                                                        "Master fundamental algorithms and data storage.", 800),
                                        createSkill("Machine Learning", "Basic concept of predictive modeling.", 1000),
                                        createSkill("SQL & Databases",
                                                        "Design and query relational databases efficiently.", 300),
                                        createSkill("Docker & Kubernetes",
                                                        "Containerization and orchestration for modern apps.", 600),
                                        createSkill("Node.js", "Server-side JavaScript runtime environments.", 400),
                                        createSkill("System Design",
                                                        "Architecting scalable and reliable software systems.", 700),
                                        createSkill("Cybersecurity Basics",
                                                        "Foundations of information security and defense.", 500),
                                        createSkill("Network Security", "Protecting networks from unauthorized access.",
                                                        600),
                                        createSkill("Cloud Computing (AWS/Azure)",
                                                        "Working with top-tier cloud infrastructure.", 750),
                                        createSkill("Flutter", "Cross-platform mobile framework by Google.", 400),
                                        createSkill("TensorFlow",
                                                        "Open-source library for machine learning and neural networks.",
                                                        900),
                                        createSkill("UI Design Principles",
                                                        "Visual design, layout, and color theory basics.", 350),
                                        createSkill("QA Testing",
                                                        "Methodologies for software quality assurance and testing.",
                                                        300),
                                        createSkill("Automation (Selenium/Cypress)",
                                                        "Scripting tests to run automatically.", 450));
                        skillRepository.saveAll(skillsList);
                        System.out.println("Seeded Default Skills");
                }

                // Seed Careers (FORCED UPDATE)
                System.out.println("Updating Career Catalog...");
                careerRepository.deleteAll(); // Clear old careers to ensure we get the new 12+ list

                List<Skill> allSkills = skillRepository.findAll();

                List<Skill> javaSkills = allSkills.stream()
                                .filter(s -> s.getName().equals("Java") || s.getName().equals("Spring Boot")
                                                || s.getName().equals("SQL & Databases"))
                                .collect(Collectors.toList());

                List<Skill> webSkills = allSkills.stream()
                                .filter(s -> s.getName().equals("React") || s.getName().equals("Node.js")
                                                || s.getName().equals("SQL & Databases"))
                                .collect(Collectors.toList());

                List<Skill> dataSkills = allSkills.stream()
                                .filter(s -> s.getName().equals("Python")
                                                || s.getName().equals("Machine Learning")
                                                || s.getName().equals("SQL & Databases"))
                                .collect(Collectors.toList());

                List<Skill> devOpsSkills = allSkills.stream()
                                .filter(s -> s.getName().equals("Docker & Kubernetes")
                                                || s.getName().equals("System Design")
                                                || s.getName().equals("Cloud Computing (AWS/Azure)"))
                                .collect(Collectors.toList());

                List<Career> careersList = new ArrayList<>(Arrays.asList(
                                createCareer("Full Stack Developer (MERN/Java)",
                                                "Develop both frontend and backend of web applications.",
                                                webSkills),
                                createCareer("Backend Architecture Expert",
                                                "Specialize in building robust server-side systems and scalable architectures.",
                                                javaSkills),
                                createCareer("AI & Data Science Specialist",
                                                "Analyze data and build machine learning models to solve complex problems.",
                                                dataSkills),
                                createCareer("DevOps & Cloud Engineer",
                                                "Streamline development workflows and manage cloud infrastructure.",
                                                devOpsSkills),
                                createCareer("Software Architect",
                                                "Design high-level structures of software systems and guide technical decisions.",
                                                allSkills.stream()
                                                                .filter(s -> s.getName().equals("System Design")
                                                                                || s.getName().equals("Java"))
                                                                .collect(Collectors.toList()))));

                // Add More Careers to make it 10+
                careersList.add(createCareer("Data Analyst",
                                "Interpret data to provide actionable insights for business decisions.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("SQL & Databases")
                                                                || s.getName().equals("Python"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("UI/UX Designer",
                                "Focus on user experience and interface design for digital products.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("React")
                                                                || s.getName().equals("UI Design Principles"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("Mobile App Developer (Flutter)",
                                "Create high-quality cross-platform mobile applications.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("Flutter")
                                                                || s.getName().equals("UI Design Principles"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("Cybersecurity Specialist",
                                "Protect organizational data and systems from security breaches and cyber threats.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("Cybersecurity Basics")
                                                                || s.getName().equals("Network Security"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("Machine Learning Engineer",
                                "Design and implement machine learning systems and algorithms.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("Machine Learning")
                                                                || s.getName().equals("TensorFlow")
                                                                || s.getName().equals("Python"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("Cloud Solutions Architect",
                                "Design and deploy scalable and secure applications on cloud platforms.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("Cloud Computing (AWS/Azure)")
                                                                || s.getName().equals("System Design")
                                                                || s.getName().equals("Docker & Kubernetes"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("Database Administrator (DBA)",
                                "Manage and maintain relational databases for performance and security.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("SQL & Databases")
                                                                || s.getName().equals("Python"))
                                                .collect(Collectors.toList())));

                careersList.add(createCareer("QA Automation Engineer",
                                "Develop automated testing scripts to ensure software quality.",
                                allSkills.stream()
                                                .filter(s -> s.getName().equals("QA Testing")
                                                                || s.getName().equals(
                                                                                "Automation (Selenium/Cypress)")
                                                                || s.getName().equals("Java"))
                                                .collect(Collectors.toList())));

                careerRepository.saveAll(careersList);
                System.out.println("Seeded 12+ Default Careers");
        }

        private Skill createSkill(String name, String desc, int duration) {
                Skill skill = new Skill();
                skill.setName(name);
                skill.setDescription(desc);
                skill.setMinDurationMinutes(duration);
                return skill;
        }

        private Career createCareer(String title, String desc, List<Skill> skills) {
                Career career = new Career();
                career.setTitle(title);
                career.setDescription(desc);
                career.setRequiredSkills(skills);
                return career;
        }
}
