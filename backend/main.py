from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import router của từng module
from backend.api.v1 import accounts, action_logs, analysis, areas, tracking

app = FastAPI(title="Customer Behavior Analysis System 🚀")

# Cấu hình CORS (cho phép frontend khác origin truy cập API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Sau có frontend thì giới hạn origin lại cho an toàn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include các router
app.include_router(accounts.router, prefix="/api")
app.include_router(action_logs.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")
app.include_router(areas.router, prefix="/api")
app.include_router(tracking.router, prefix="/api")


# Root endpoint test
@app.get("/")
def read_root():
    return {"message": "Hello from the Behavior Analysis System!"}