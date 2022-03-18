clean:
	docker compose down
	docker volume prune

up:
	docker compose up -d
	npm install
	npm run dev