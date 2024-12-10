# Image Colorizer

Welcome to the **Image Colorizer** project! This repository contains the implementation of an image colorization tool using advanced deep learning techniques. The goal of this project is to convert grayscale images into vibrant, colored versions.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Automatic colorization of grayscale images.
- Support for various image formats (e.g., PNG, JPEG).
- Fast and efficient processing using pretrained models.
- Easy-to-use interface for both beginners and professionals.

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AbidKhan01ak/ImageColorizer.git
   cd ImageColorizer
   ```
2. **Set Up a Virtual Environment (optional but recommended)**
  ```bash
  python -m venv venv
  source venv/bin/activate   # On Windows: venv\Scripts\activate
  ```
3.**Install Dependencies**
```bash
  pip install -r requirements.txt
```
4.**Download the Pretrained Model**
```bash
https://drive.google.com/drive/folders/1VGe-CVvw4ZYe7Uy3f7BXWEBcXIk9WgxI?usp=sharing
```

# Usage
1. **Run the Application**
   ```bash
     python application.py
   ```
2. **Provide Input Image**
  -  Place the grayscale image in the input_images folder or upload it via the interface.

3. **View the Output**
  - The colorized image will be saved in the output_images folder.

## Project Structure

```plaintext
ImageColorizer/
|
├── backend/                # Contains Flask backend code
│   ├── app.py              # Main application script for Flask
│   ├── models/             # Contains the pretrained models
│   ├── static/             # Contains folders for uploads and output
│   ├── requirements.txt    # Dependencies for the Flask backend
│   └── utils/              # Utility scripts for preprocessing, postprocessing, etc.
|
├── frontend/               # Contains React frontend code
│   ├── src/                # Source files for React
│   │   ├── components/     # React components for UI
│   │   ├── data/           # Data management files
│   │   ├── services/       # Services for API integration
│   │   ├── utils/          # Utility functions for frontend logic
│   │   └── App.js          # Main React component
│   ├── public/             # Public assets for the React app
│   ├── package.json        # Dependencies and scripts for the React frontend
│   └── README.md           # Documentation for the React frontend
|
├── README.md               # Project documentation
```

## Technologies Used

### 1. Backend
- **Python**: Core programming language for the project.
- **Flask**: Web framework for building the application interface and handling API requests.
- **OpenCV**: Library for advanced image processing tasks.
- **NumPy**: Enables efficient numerical computations for image data.

### 2. Frontend
- **React**: JavaScript library for building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for creating responsive and customizable designs.
- **Axios**: Promise-based HTTP client for making API requests to the backend.

# Future Enhancements
- Implement batch processing for multiple images.
- Improve the model for higher accuracy and color precision.
- Add support for video colorization.

## Credits

- This project uses a pre-trained deep learning model for colorization. The model is based on the paper "Let there be Color!: Joint End-to-end Learning of Global and Local Image Priors for Automatic Image Colorization with Simultaneous Classification" by Zhang et al.

url :- (https://iizuka.cs.tsukuba.ac.jp/projects/colorization/en/)

# Contributing
Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch for your feature/bugfix.
- Commit your changes.
- Submit a pull request.

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out:

- **Author**: Abid Rafique Khan  
- **Email**: [abidkhan01ak@gmail.com](mailto:abidkhan01ak@gmail.com)  
- **GitHub**: [AbidKhan01ak](https://github.com/AbidKhan01ak)  
- **LinkedIn**: [Abid Rafique Khan](https://www.linkedin.com/in/abid-rafique-khan/)  

Your feedback and contributions are greatly appreciated!
