CREATE TABLE IF NOT EXISTS `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text,
	`slug` text,
	`name` text,
	`description` text,
	`url` text,
	`image` text,
	`color` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`update_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
