"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
<Image
      src="/pair-man-woman-wearing-glasses-carried-lots-paper-bags-shopping.jpg"
      alt="Shopping image"
      width={500}
      height={300}
  />

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState(null);
  const sliderRef = useRef(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveFAQIndex(activeFAQIndex === index ? null : index);
  };

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Scroll slider
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  // Countdown Timer
  useEffect(() => {
    const countdownElement = document.querySelector(".countdown-timer");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (hoursElement && minutesElement && secondsElement) {
      const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24-hour countdown

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
          clearInterval(timer);
          if (countdownElement) countdownElement.innerHTML = "<p>Sale Ended!</p>";
          return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
      }

      const timer = setInterval(updateCountdown, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(timer);
    }
  }, []);


  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <a href="#">E-Shop</a>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "show-mobile" : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#featured-products">Shop</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#contact-support">Contact</a></li>
        </ul>

        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button><i className="fas fa-search"></i></button>
        </div>

        <div className="nav-icons">
          <a href="#">
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </a>
          <a href="#"><i className="fas fa-user"></i></a>
          <a href="#"><i className="fas fa-heart"></i></a>
        </div>

        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Discover the Latest Trends</h1>
          <p>Upgrade your style with our exclusive collection of trending products.</p>
          <a href="#featured-products" className="shop-now-btn">Shop Now</a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products" id="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Product 1 */}
          <div className="product-card">
            <img src="white-canvas-sneakers-unisex-footwear-fashion.jpg" alt="Product 1" />
            <h3>Wireless Headphones</h3>
            <p className="price">$99.99</p>
            <button className="add-to-cart-btn" onClick={() => addToCart("Wireless Headphones")}>Add to Cart</button>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <img src="smartwatch-screen-digital-device.jpg" alt="Product 2" />
            <h3>Smart Watch</h3>
            <p className="price">$149.99</p>
            <button className="add-to-cart-btn" onClick={() => addToCart("Smart Watch")}>Add to Cart</button>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <img src="reusable-eco-friendly-tote-bag.jpg" alt="Product 3" />
            <h3>Fashion Bag</h3>
            <p className="price">$79.99</p>
            <button className="add-to-cart-btn" onClick={() => addToCart("Fashion Bag")}>Add to Cart</button>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <img src="white-canvas-sneakers-unisex-footwear-fashion.jpg" alt="Product 4" />
            <h3>White Shoes</h3>
            <p className="price">$59.99</p>
            <button className="add-to-cart-btn" onClick={() => addToCart("White Shoes")}>Add to Cart</button>
          </div>

          {/* Product 5 */}
          <div className="product-card">
            <img src="casual-white-blouse-women-rsquo-s-fashion.jpg" alt="Product 5" />
            <h3>White Shirt</h3>
            <p className="price">$49.99</p>
            <button className="add-to-cart-btn" onClick={() => addToCart("White Shirt")}>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" id="categories">
        <h2>Men's Fashion Categories</h2>
        <div className="category-grid">
          {/* Category 1 */}
          <div className="category-card">
            <i className="fas fa-tshirt"></i>
            <h3>T-Shirts</h3>
          </div>

          {/* Category 2 */}
          <div className="category-card">
            <i className="fas fa-shoe-prints"></i>
            <h3>Shoes</h3>
          </div>

          {/* Category 3 */}
          <div className="category-card">
            <i className="fas fa-vest"></i>
            <h3>Jackets</h3>
          </div>

          {/* Category 4 */}
          <div className="category-card">
            <i className="fas fa-hat-cowboy"></i>
            <h3>Accessories</h3>
          </div>

          {/* Category 5 */}
          <div className="category-card">
            <i className="fas fa-rings-wedding"></i>
            <h3>Watches</h3>
          </div>

          {/* Category 6 */}
          <div className="category-card">
            <i className="fas fa-socks"></i>
            <h3>Underwear</h3>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about-us">
        <div className="about-content">
          <h2>About Us</h2>
          <p className="intro">
            Welcome to <strong>E-Shop</strong>, your go-to destination for the latest trends in fashion and lifestyle.
            We are passionate about delivering high-quality products that inspire and empower our customers.
          </p>
          <p className="unique">
            What sets us apart is our commitment to sustainability, exceptional customer service, and a curated selection
            of products that cater to your unique style. We believe in making fashion accessible, affordable, and eco-friendly.
          </p>
        </div>
        <div className="about-image">
          <img src="business-people-partnership-support-team-urban-scene-concept.jpg" alt="Our Team" />
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews" id="customer-reviews">
        <h2>What Our Customers Say</h2>

        {/* Navigation Arrows */}
        <button className="slider-arrow left-arrow" onClick={() => scrollSlider(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="review-slider" ref={sliderRef}>
          {/* Review 1 */}
          <div className="review-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <h3>John Doe</h3>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="feedback">
              "I absolutely love the quality of the products! Fast shipping and excellent customer service. Highly recommend!"
            </p>
          </div>

          {/* Review 2 */}
          <div className="review-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <h3>Jane Smith</h3>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <p className="feedback">
              "Great selection of products and amazing deals. My go-to store for all my fashion needs!"
            </p>
          </div>

          {/* Review 3 */}
          <div className="review-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <h3>Mike Johnson</h3>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <p className="feedback">
              "The products are top-notch, and the delivery was super fast. Will definitely shop here again!"
            </p>
          </div>

          {/* Review 4 */}
          <div className="review-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <h3>Emily Brown</h3>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="feedback">
              "Amazing experience! The customer support team was very helpful, and the products are worth every penny."
            </p>
          </div>
        </div>

        <button className="slider-arrow right-arrow" onClick={() => scrollSlider(1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="offer-banner">
          <h2>Flash Sale!</h2>
          <p>Huge discounts on selected items. Limited time only!</p>
          <div className="countdown-timer">
            <div className="timer-box">
              <span id="hours">00</span>
              <small>Hours</small>
            </div>
            <div className="timer-box">
              <span id="minutes">00</span>
              <small>Minutes</small>
            </div>
            <div className="timer-box">
              <span id="seconds">00</span>
              <small>Seconds</small>
            </div>
          </div>
          <a href="#" className="shop-now-btn">Shop Now</a>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="contact-support" id="contact-support">
        <h2>Contact & Support</h2>
        <div className="container">
          {/* Contact Form */}
          <div className="contact-form">
            <h3>Get in Touch</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-accordion">
              {/* FAQ Item 1 */}
              <div className={`faq-item ${activeFAQIndex === 0 ? "active" : ""}`}>
                <button className="faq-question" onClick={() => toggleFAQ(0)}>
                  How can I track my order?
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>You can track your order by logging into your account and visiting the "Order History" section. You will receive a tracking number via email once your order is shipped.</p>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className={`faq-item ${activeFAQIndex === 1 ? "active" : ""}`}>
                <button className="faq-question" onClick={() => toggleFAQ(1)}>
                  What is your return policy?
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>We offer a 30-day return policy for most items. Please ensure the product is unused and in its original packaging. Visit our Returns page for more details.</p>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className={`faq-item ${activeFAQIndex === 2 ? "active" : ""}`}>
                <button className="faq-question" onClick={() => toggleFAQ(2)}>
                  How do I contact customer support?
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>You can contact our customer support team by filling out the contact form on this page or emailing us at support@eshop.com. We typically respond within 24 hours.</p>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className={`faq-item ${activeFAQIndex === 3 ? "active" : ""}`}>
                <button className="faq-question" onClick={() => toggleFAQ(3)}>
                  Do you offer international shipping?
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on your location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          {/* Links Section */}
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
            <a href="/return-policy">Return Policy</a>
          </div>

          {/* Social Media Icons */}
          <div className="social-media">
            <a href="https://www.facebook.com/share/1ECYDnjyQ5/?mibextid=wwXIfr" target="_blank" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/kimheng_3951?igsh=d3BsZ3ZiYzV5YXRi&utm_source=qr" target="_blank" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Copyright Text */}
          <div className="footer-copyright">
            <p>&copy; 2023 Your E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}