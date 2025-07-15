const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
 const { get } = require("mongoose");
const router = express.Router();

//helper function to get cart by guestId or userId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    } 
    return null;
};

// @route POST /api/cart
// @desc Add product to cart for a guest user
// @access Public
router.post("/", async (req, res) => {
    

    const { productId, quantity, size, color, guestId, userId } = req.body;
    
    // Validate required fields
   

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        
        //determine if the user is a guest or logged in
        let cart = await getCart(userId, guestId);

        //if the cart exists, update it
        if (cart) {
           const productIndex = cart.products.findIndex(
            (p) =>
                 p.productId.toString() === productId &&
             p.size === size && 
             p.color === color
            );
            if (productIndex > -1) {
                //if the product already exists in the cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            }
            else {
                //if the product does not exist in the cart, add it
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }
            //recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            //if the cart does not exist, create a new one for the guest user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                },],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in cart for a guest user or logged in user
// @access Public
router.put("/", async (req, res) => {
    // Add validation for req.body
    
    const { productId, quantity, size, color, guestId, userId } = req.body;
    

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );
        if (productIndex > -1) {
            //update the quantity of the product
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            }
            else {
                //if quantity is 0, remove the product from the cart
                cart.products.splice(productIndex, 1);
            }

            //recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }   
        else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route DELETE /api/cart
// @desc Remove product from cart for a guest user or logged in user
// @access Public
router.delete("/", async (req, res) => {
    // Add validation for req.body
   

    const { productId, size, color, userId, guestId } = req.body;
    
    // Validate required fields
    

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        
        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.size === size && 
            p.color === color
        );
        
        if (productIndex > -1) {
            //remove the product from the cart
            cart.products.splice(productIndex, 1);
            //recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// @route GET /api/cart
// @desc Get cart details for a guest user or logged in user
// @access Public
router.get("/", async (req, res) => {
    const { guestId, userId } = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        }
        else {
            res.status(404).json({ message: "Cart not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

});



//@route POST /api/cart/merge
// @desc Merge guest cart with user cart
// @access Protected
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        //find the guest cart and the user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if(guestCart) {
               if (guestCart.products.length === 0) {
                   return res.status(400).json({ message: "Guest cart is empty" });
               }

               if(userCart){
                //merge the guest cart products into the user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                        );
                        if(productIndex > -1) {
                            //if the product already exists in the user cart, update the quantity
                            userCart.products[productIndex].quantity += guestItem.quantity;
                        } else {    
                            //if the product does not exist in the user cart, add it
                            userCart.products.push(guestItem);
                        }
                    });
                //recalculate total price
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0 
                );
                await userCart.save();

                //delete the guest cart
                try {
                await Cart.findOneAndDelete({ guestId });
               
                }
                catch (error) { 
                    console.error("Error deleting guest cart:", error);
                }
                res.status(200).json(userCart);
               } else {
                //if the user cart does not exist, create a new one with the guest cart products
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
               }
    } else {
        if (userCart) {
            // Guest cart has already been merged, return user cart
           return res.status(200).json(userCart);
        }
             res.status(404).json({ message: "Guest cart not found" });
    }
 } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Server error" });
 }
});










module.exports = router;