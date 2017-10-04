# Application Data Flow


## Actions
 * Create Account (mapped on phone number)
 * Login Account
 * Make payment to phone number
 * Block/stop payment
 * Check status of payment

## Components ([Architecture](arch.jpg))
 * Server-Side (API end point)
   * All purpose Queue
   * Task sorter -> add to specific queue
 * Task specific Queue
 * Task Specific Workers
 * DB server
 * Frontend application