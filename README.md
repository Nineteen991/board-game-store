So this is a simple MERN e-commerce store that I made to continue practicing my skills.

I've been playing board games recently and decided to make this website based around either games that I have or want to eventually buy.

This website is connected to MongoDB Atlas and will also be connected to Stripe for payments. 

Stripe Visa # 4242 4242 4242 4242
Any future expiration date, cvc, & zip will work.
  - Listen for the Stripe webhook (in your terminal run the below command)
    - stripe listen --forward-to localhost:5000/api/v1/orders/hook
      - this will let the ordersController.js know that a successful
        purchase has been made & will update the inventory

I've Dockerized the front & back ends and added Docker Compose so anyone can run the containers on their local machine.