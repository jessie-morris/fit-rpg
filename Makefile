clean:
	docker compose down
	docker volume prune

up:
	docker compose up -d
	npm run dev