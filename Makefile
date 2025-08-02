up:
	@echo "Bringing up the application..."
	cd backend/api-gateway && mvn clean install 
	cd ..
	cd backend/auth-service && mvn clean install -DskipTests
	cd ..
	cd backend/chat-service && mvn clean install -DskipTests
	cd ..
	cd backend/profile-service && mvn clean install -DskipTests
	cd ..
	cd backend/notification-service && mvn clean install -DskipTests
	cd ..
	docker compose up --build
container:
	@echo "Starting the container..."
	docker compose up --build
down:
	@echo "Bringing down the application..."
	docker compose down
