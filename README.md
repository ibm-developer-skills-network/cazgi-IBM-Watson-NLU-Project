# 🧠 IBM Watson NLU Project

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Overview

This project demonstrates integration with **IBM Watson Natural Language Understanding (NLU)** in a Node.js-based web application. It allows users to analyze the sentiment and emotion of text or content extracted from a given URL via the IBM Watson NLU API.

---

## 📂 Repository Structure

```
.
├── views/                 # EJS templates for rendering web pages
├── server.js              # Main Node.js/Express server
├── package.json           # Project metadata & dependencies
├── .env.example           # Sample environment configuration
└── README.md
```

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express.js
* **Frontend**: EJS templates, HTML/CSS
* **API**: IBM Watson NLU
* **Deployment**: Local or IBM Cloud

---

## ✅ Prerequisites

* Node.js (v12+ recommended)
* IBM Cloud account (for Watson NLU instance)
* IBM Watson NLU service credentials (API key, URL)

---

## ⚙️ Setup & Run (Local)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vitor-a-avancini/cazgi-IBM-Watson-NLU-Project.git
   cd cazgi-IBM-Watson-NLU-Project
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Configure Watson NLU credentials:**

   * Copy `.env.example` to `.env` and fill in your IBM Watson API key and URL.
4. **Run the application:**

   ```bash
   node server.js
   ```
5. **Open your browser:**

   * Visit [http://localhost:8080](http://localhost:8080)

---

## 🖥️ Features

* Enter a **URL** or **plain text** to analyze
* Sentiment and emotion analysis via IBM Watson NLU
* Simple, interactive web interface (EJS)
* Environment variables for secure credential management

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

PRs and suggestions are welcome! Fork, star, or submit issues.

---

## 📚 References & Links

* [IBM Watson NLU Docs](https://cloud.ibm.com/apidocs/natural-language-understanding)
* [Express.js Documentation](https://expressjs.com/)

---

> **Analyze and build with IBM Watson NLU and Node.js.**
