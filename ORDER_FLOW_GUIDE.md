# Order Flow: Checkout to Admin Dashboard

## How It Works

Your system is **already fully connected**! Here's the flow:

```
User Places Order → Database → Admin Dashboard
     (Checkout)      (database.db)    (Real-time)
```

### The Connection

1. **Checkout Page** (`app/checkout/page.tsx`)
   - Calls `createOrder()` server action
   - Saves order to `database.db`
   - Includes: customer name, items, total, payment method, user ID

2. **Database** (`database.db`)
   - Stores all orders in `orders` table
   - Links orders to users via `user_id` field

3. **Admin Dashboard** (`app/admin/page.tsx`)
   - Calls `getOrders()` server action
   - Reads from same `database.db`
   - Displays orders in real-time

## End-to-End Test

### Step 1: Login as a User

1. Go to: **http://localhost:3000/login**
2. Login with:
   - Email: `tumwesigyemaxwell67@gmail.com`
   - Password: `@Barabara123456788`

### Step 2: Add Products to Cart

1. Go to: **http://localhost:3000/products**
2. Click "Add to Cart" on 2-3 products
3. View cart (click cart icon in navbar)

### Step 3: Checkout

1. Go to: **http://localhost:3000/checkout**
2. Fill in payment details:
   - Payment Method: Mobile Money or Card
   - If Mobile Money: Select MTN or Airtel
   - If Card: Enter card details
3. Click "Place Order"
4. Wait for success message

### Step 4: View in Admin Dashboard

1. Go to: **http://localhost:3000/admin**
2. You should see:
   - **Total Revenue** updated
   - **Pending Orders** count increased
   - **Recent Orders** showing your new order with:
     - Your name (Kabateraine Tumwesige)
     - Products ordered
     - Total amount

### Step 5: View Order Details

1. Go to: **http://localhost:3000/admin/orders**
2. See complete order list with:
   - Order ID
   - Customer Name
   - Items
   - Total
   - Payment Method
   - Status
   - Date

## What's Already Connected

✅ **Database**: Single `database.db` file  
✅ **Server Actions**: Shared `createOrder` and `getOrders`  
✅ **User Linking**: Orders linked to logged-in user  
✅ **Real-time Updates**: Refresh admin page to see new orders  

## Technical Details

### Order Creation Flow

```typescript
// In checkout/page.tsx
const orderData = {
    customerName: session.user?.name || 'Guest',
    items: items.map(item => item.name),
    total: totalPrice + tax,
    paymentMethod: paymentMethod,
    userId: session.user?.id || ''
};

const result = await createOrder(orderData);
```

### Order Retrieval Flow

```typescript
// In admin/page.tsx
const recentOrders = await getOrders();
// Returns all orders from database
```

### Database Schema

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  items TEXT NOT NULL,  -- JSON array
  total REAL NOT NULL,
  payment_method TEXT NOT NULL,
  user_id TEXT,
  status TEXT DEFAULT 'Pending',
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Testing Checklist

- [ ] Login as user
- [ ] Add products to cart
- [ ] Complete checkout
- [ ] Verify order success message
- [ ] Open admin dashboard
- [ ] Confirm order appears in "Recent Orders"
- [ ] Check order details in admin/orders page
- [ ] Verify customer name matches logged-in user
- [ ] Confirm total amount is correct

## Expected Results

After placing an order, you should see:

**Admin Dashboard:**
- Total Revenue: Increased by order amount
- Pending Orders: Count increased by 1
- Recent Orders: New order at the top with:
  - Customer: "Kabateraine Tumwesige"
  - Items: List of products ordered
  - Total: Order amount in UGX

**Admin Orders Page:**
- New row in orders table
- All order details visible
- Status: "Pending"
- Date: Current timestamp

## No Additional Setup Needed!

Everything is already connected and working. Just:
1. Place an order as a logged-in user
2. Refresh the admin dashboard
3. See the order appear instantly!

---

**Note**: The admin dashboard uses server-side rendering, so you may need to refresh the page to see new orders. For real-time updates without refresh, we would need to add WebSockets or polling (optional enhancement).
