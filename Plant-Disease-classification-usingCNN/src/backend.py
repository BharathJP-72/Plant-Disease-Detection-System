from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from torchvision import transforms
from torchvision.models import resnet50
import torch
from PIL import Image

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (you can restrict this if needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 1. Load the trained model
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = resnet50(pretrained=False)
model.fc = torch.nn.Linear(model.fc.in_features, 6)  # Replace 4 with the number of classes in your dataset
model.load_state_dict(torch.load("best_model.pth", map_location=DEVICE))
model.eval()

# 2. Define class labels
CLASS_IDX = {0: "Bacterial Leaf Blight", 1: "Blast", 2: "Brown spot", 3: "RedRot", 4: "Rust", 5: "Yellow"}  # Update as needed

# 3. Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),        # Resize the image to 224x224 pixels
    transforms.ToTensor(),               # Convert image to PyTorch tensor
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])  # Normalize the image
])

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # 4. Load the image
        image = Image.open(file.file).convert("RGB")  # Ensure image is in RGB format
        image = transform(image).unsqueeze(0).to(DEVICE)

        # 5. Perform prediction
        with torch.no_grad():
            output = model(image)
            _, predicted = torch.max(output, 1)
            class_label = CLASS_IDX[predicted.item()]

        # 6. Return the result
        return JSONResponse(content={"class": class_label})
    except Exception as e:
        print(f"Error: {e}")  # Print the error to the console
        return JSONResponse(content={"error": str(e)}, status_code=500)
