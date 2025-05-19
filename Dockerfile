FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better caching
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose ports for backend API and frontend
EXPOSE 12000
EXPOSE 12001

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=12000

# Run the application
CMD ["bash", "run.sh"]