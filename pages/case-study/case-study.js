function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburgers = document.querySelectorAll(".hamburger");

  navLinks.classList.toggle("active");

  hamburgers.forEach((hamburger) => {
    hamburger.classList.toggle("active");
  });
}
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Add this script to your case-study.js or in a script tag

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const caseStudyCards = document.querySelectorAll(".case-study-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      caseStudyCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "flex"; // or whatever display value you're using
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});


// Case study data for all projects
const caseStudiesData = {
  dehleze: {
    title: "Dehleze Clothing - E-Commerce Launch",
    tag: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 months project",
    budget: "$25k budget",
    content: `
      <h3>Challenge</h3>
      <p>Dehleze Clothing, a boutique fashion retailer with two physical stores, struggled to expand beyond their local market. Their existing website was outdated, not mobile-friendly, and lacked e-commerce functionality. They needed a complete digital transformation to compete in the online fashion space.</p>
      
      <h3>Solution</h3>
      <p>We developed a custom e-commerce platform with:</p>
      <ul>
          <li>Fully responsive design optimized for all devices</li>
          <li>Integrated inventory management system synced with their POS</li>
          <li>Custom checkout flow with multiple payment options</li>
          <li>Advanced product filtering and recommendation engine</li>
          <li>SEO optimization that increased organic traffic by 180%</li>
          <li>Content management system for easy updates</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>300% increase in online sales within first 3 months</li>
          <li>Expanded to serve customers in 5 new states</li>
          <li>Reduced cart abandonment rate from 68% to 23%</li>
          <li>40% of total revenue now comes from online channels</li>
          <li>Recipient of "Best Emerging E-Commerce Site" award</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"Ecomsy transformed our business. What was once a local boutique is now a nationally recognized brand. Their team understood our vision and delivered beyond our expectations. The new platform has been instrumental in our growth, especially during the pandemic when physical stores were closed."</em> - Sarah Johnson, CEO of Dehleze Clothing</p>
    `,
  },
  urbanspace: {
    title: "UrbanSpace Real Estate Platform",
    tag: "Real Estate",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "4 months project",
    budget: "$42k budget",
    content: `
      <h3>Challenge</h3>
      <p>UrbanSpace Real Estate needed a modern platform to manage their growing property portfolio and provide better service to clients. Their existing system was fragmented across multiple tools, causing inefficiencies and poor client experience.</p>
      
      <h3>Solution</h3>
      <p>We created a comprehensive real estate platform featuring:</p>
      <ul>
          <li>Custom CRM for managing client relationships</li>
          <li>Interactive property listings with virtual tours</li>
          <li>Automated document generation for contracts</li>
          <li>Integrated mortgage calculator and affordability tools</li>
          <li>Mobile app for agents to access data on the go</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>35% increase in agent productivity</li>
          <li>20% faster sales cycle</li>
          <li>Client satisfaction scores improved from 78% to 94%</li>
          <li>Reduced paperwork by 60%</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"The UrbanSpace platform has revolutionized how we do business. Our agents are more efficient, our clients are happier, and we're closing deals faster than ever before. Ecomsy understood the unique needs of the real estate industry and delivered a perfect solution."</em> - Michael Chen, CEO of UrbanSpace</p>
    `,
  },
  freelancerpro: {
    title: "FreelancerPro Portfolio System",
    tag: "SaaS",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 months project",
    budget: "$68k budget",
    content: `
      <h3>Challenge</h3>
      <p>Independent professionals lacked a unified platform to showcase their work, manage clients, and handle business operations. Existing solutions were either too simple or overly complex.</p>
      
      <h3>Solution</h3>
      <p>We developed FreelancerPro, an all-in-one platform with:</p>
      <ul>
          <li>Customizable portfolio templates</li>
          <li>Integrated project management tools</li>
          <li>Client communication hub</li>
          <li>Invoicing and payment processing</li>
          <li>Time tracking and productivity analytics</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>Launched with 500+ beta users</li>
          <li>Grew to 15,000+ active users in first year</li>
          <li>Average user reported 30% time savings on admin tasks</li>
          <li>4.8/5 average rating from users</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"As a freelance designer, I was spending more time on admin than actual design work. FreelancerPro changed that. Now I have more time for creative work and my business has grown by 40% since using the platform."</em> - Jessica Williams, Freelance Designer</p>
    `,
  },
  meditrack: {
    title: "MediTrack Patient Portal",
    tag: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 months project",
    budget: "$120k budget",
    content: `
      <h3>Challenge</h3>
      <p>A regional hospital network needed to modernize patient engagement while maintaining strict HIPAA compliance. Their paper-based system caused delays and frustrated both patients and staff.</p>
      
      <h3>Solution</h3>
      <p>We built a secure patient portal with:</p>
      <ul>
          <li>HIPAA-compliant messaging and file sharing</li>
          <li>Appointment scheduling and reminders</li>
          <li>Electronic health records access</li>
          <li>Prescription refill requests</li>
          <li>Telemedicine integration</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>75% of patients adopted the portal within 6 months</li>
          <li>Reduced no-show appointments by 40%</li>
          <li>Cut administrative costs by $250k annually</li>
          <li>Improved patient satisfaction scores by 35%</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"The MediTrack portal has transformed how we deliver care. Patients love the convenience, and our staff can focus on care rather than paperwork. Ecomsy's understanding of healthcare regulations was crucial to the project's success."</em> - Dr. Robert Thompson, Chief Medical Officer</p>
    `,
  },
  gourmet: {
    title: "Gourmet Foods Marketplace",
    tag: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "5 months project",
    budget: "$55k budget",
    content: `
      <h3>Challenge</h3>
      <p>A specialty food distributor wanted to create a premium online marketplace connecting artisan producers with discerning customers. They needed a platform that could showcase product quality while handling complex subscription models.</p>
      
      <h3>Solution</h3>
      <p>We developed a gourmet marketplace featuring:</p>
      <ul>
          <li>High-end product presentation with professional photography</li>
          <li>Flexible subscription options (weekly, monthly, one-time)</li>
          <li>Producer profiles with storytelling elements</li>
          <li>Temperature-controlled shipping integration</li>
          <li>Gift and corporate gifting functionality</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>Launched with 50 artisan producers, now featuring 200+</li>
          <li>65% of revenue from recurring subscriptions</li>
          <li>Average order value increased by 45%</li>
          <li>Featured in "Best Food Websites" by Culinary Magazine</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"Ecomsy understood our vision for a premium food experience. They created a platform that perfectly showcases our producers' stories and products. The subscription system has been particularly successful, creating predictable revenue we can count on."</em> - David Martinez, Founder of Gourmet Foods</p>
    `,
  },
  itteck: {
    title: "I.T Teck Solution",
    tag: "I.T Service Solution",
    image:
      "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "5 months project",
    budget: "$55k budget",
    content: `
      <h3>Challenge</h3>
      <p>I.T Teck Solution needed a comprehensive digital platform to showcase their IT services, streamline client onboarding, and demonstrate technical expertise in a competitive market.</p>
      
      <h3>Solution</h3>
      <p>We developed a custom solution featuring:</p>
      <ul>
          <li>Service catalog with detailed technical specifications</li>
          <li>Interactive capability assessment tools</li>
          <li>Client portal for ticket management</li>
          <li>Knowledge base and technical resources</li>
          <li>Integration with monitoring and alerting systems</li>
      </ul>
      
      <h3>Results</h3>
      <ul>
          <li>40% increase in qualified leads</li>
          <li>Reduced sales cycle by 30%</li>
          <li>Improved client retention by 25%</li>
          <li>Recognized as "Most Innovative IT Provider" by Tech Awards</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <p><em>"Our new platform has become a competitive differentiator. Clients appreciate the transparency into our services and capabilities. Ecomsy delivered a solution that perfectly balances technical depth with user-friendly design."</em> - Sarah Johnson, CTO of I.T Teck Solution</p>
    `,
  },
};


// Get DOM elements
const popup = document.getElementById("caseStudyPopup");
const closePopup = document.querySelector(".close-popup");
const caseStudyButtons = document.querySelectorAll(".read-case-study");

// Open popup function with specific case study data
function openPopup(caseId) {
  const caseData = caseStudiesData[caseId];
  if (caseData) {
    populatePopup(caseData);
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

// Close popup function
function closePopupFunc() {
  popup.style.display = "none";
  document.body.style.overflow = "auto";
}

// Populate popup with data
function populatePopup(data) {
  document.getElementById("popupTitle").textContent = data.title;
  document.getElementById("popupTag").textContent = data.tag;
  document.getElementById("popupImage").style.backgroundImage = `url(${data.image})`;
  document.getElementById("popupDuration").textContent = data.duration;
  document.getElementById("popupBudget").textContent = data.budget;
  document.getElementById("popupContent").innerHTML = data.content;
}

// Event listeners for case study buttons
caseStudyButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const caseId = button.getAttribute("data-case");
    openPopup(caseId);
  });
});

// Close when clicking X
closePopup.addEventListener("click", closePopupFunc);

// Close when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopupFunc();
  }
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.style.display === "block") {
    closePopupFunc();
  }
});