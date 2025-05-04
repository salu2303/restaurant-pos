
// import React, { useState } from 'react';
// import { usePOS } from '@/context/POSContext';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useNavigate } from 'react-router-dom';
// import { PaymentMethod } from '@/lib/types';
// import OrderItem from '@/components/OrderItem';
// import { ArrowLeft, CreditCard, Receipt, Smartphone, Banknote } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// const Checkout = () => {
//   const { currentOrder, completeOrder } = usePOS();
//   const navigate = useNavigate();
  
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
//   const [amountReceived, setAmountReceived] = useState<string>(
//     currentOrder ? currentOrder.total.toFixed(2) : '0.00'
//   );
  
//   const handlePaymentMethodChange = (value: string) => {
//     setPaymentMethod(value as PaymentMethod);
    
//     // Reset amount to exact total for card and mobile payments
//     if (value === 'card' || value === 'mobile') {
//       setAmountReceived(currentOrder ? currentOrder.total.toFixed(2) : '0.00');
//     }
//   };
  
//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Only allow numeric values with up to 2 decimal places
//     if (/^\d*\.?\d{0,2}$/.test(value)) {
//       setAmountReceived(value);
//     }
//   };
  
//   const handleCompleteOrder = () => {
//     if (!currentOrder) return;
    
//     completeOrder(paymentMethod, parseFloat(amountReceived || '0'));
//     navigate('/');
//   };
  
//   const calculateChange = (): number => {
//     if (!currentOrder) return 0;
//     const received = parseFloat(amountReceived || '0');
//     return Math.max(0, received - currentOrder.total);
//   };
  
//   if (!currentOrder) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[70vh] animate-fade-in">
//         <CreditCard className="h-12 w-12 text-muted mb-4" />
//         <h1 className="text-2xl font-bold mb-2">No Active Order</h1>
//         <p className="text-muted-foreground mb-6">
//           Select a table and create an order first
//         </p>
//         <Button onClick={() => navigate('/tables')}>
//           Go to Tables
//         </Button>
//       </div>
//     );
//   }
  
//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
//           <p className="text-muted-foreground mt-1">
//             Complete order for {currentOrder.tableName}
//           </p>
//         </div>
        
//         <Button variant="outline" onClick={() => navigate('/orders')}>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Order
//         </Button>
//       </div>
      
//       <div className="grid md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
          
//           <ScrollArea className="h-[450px]">
//             <CardContent className="space-y-4">
//               {currentOrder.items.map(item => (
//                 <OrderItem key={item.id} item={item} editable={false} />
//               ))}
//             </CardContent>
//           </ScrollArea>
          
//           <CardFooter className="flex-col border-t pt-4">
//             <div className="w-full flex justify-between mb-2">
//               <span className="font-medium">Subtotal</span>
//               <span>${currentOrder.total.toFixed(2)}</span>
//             </div>
//             <div className="w-full flex justify-between mb-2">
//               <span className="font-medium">Tax</span>
//               <span>$0.00</span>
//             </div>
//             <div className="w-full flex justify-between pt-2 border-t">
//               <span className="font-bold">Total</span>
//               <span className="font-bold text-lg">${currentOrder.total.toFixed(2)}</span>
//             </div>
//           </CardFooter>
//         </Card>
        
//         <Card className="flex flex-col">
//           <CardHeader>
//             <CardTitle>Payment</CardTitle>
//           </CardHeader>
          
//           <CardContent className="space-y-6 flex-grow">
//             <div className="space-y-3">
//               <Label>Payment Method</Label>
//               <RadioGroup 
//                 value={paymentMethod} 
//                 onValueChange={handlePaymentMethodChange}
//                 className="grid grid-cols-3 gap-4"
//               >
//                 <Label
//                   htmlFor="cash"
//                   className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
//                     paymentMethod === 'cash' ? 'border-primary' : 'border-transparent'
//                   }`}
//                 >
//                   <RadioGroupItem value="cash" id="cash" className="sr-only" />
//                   <Banknote className="mb-2 h-6 w-6" />
//                   <span className="text-sm">Cash</span>
//                 </Label>
                
//                 <Label
//                   htmlFor="card"
//                   className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
//                     paymentMethod === 'card' ? 'border-primary' : 'border-transparent'
//                   }`}
//                 >
//                   <RadioGroupItem value="card" id="card" className="sr-only" />
//                   <CreditCard className="mb-2 h-6 w-6" />
//                   <span className="text-sm">Card</span>
//                 </Label>
                
//                 <Label
//                   htmlFor="mobile"
//                   className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
//                     paymentMethod === 'mobile' ? 'border-primary' : 'border-transparent'
//                   }`}
//                 >
//                   <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
//                   <Smartphone className="mb-2 h-6 w-6" />
//                   <span className="text-sm">Mobile</span>
//                 </Label>
//               </RadioGroup>
//             </div>
            
//             {paymentMethod === 'cash' && (
//               <div className="space-y-3">
//                 <Label htmlFor="amount">Amount Received</Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
//                   <Input
//                     id="amount"
//                     value={amountReceived}
//                     onChange={handleAmountChange}
//                     className="pl-8"
//                   />
//                 </div>
                
//                 <div className="flex justify-between p-3 bg-muted rounded-md">
//                   <span>Change Due:</span>
//                   <span className="font-bold">${calculateChange().toFixed(2)}</span>
//                 </div>
                
//                 <div className="grid grid-cols-3 gap-2">
//                   {[5, 10, 20, 50, 100].map(amount => (
//                     <Button
//                       key={amount}
//                       type="button"
//                       variant="outline"
//                       onClick={() => setAmountReceived(amount.toFixed(2))}
//                     >
//                       ${amount}
//                     </Button>
//                   ))}
                  
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setAmountReceived(currentOrder.total.toFixed(2))}
//                   >
//                     Exact
//                   </Button>
//                 </div>
//               </div>
//             )}
            
//             {paymentMethod === 'card' && (
//               <div className="flex items-center justify-center h-32 border rounded-md bg-muted/50">
//                 <div className="text-center">
//                   <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-muted-foreground">Card payment</p>
//                 </div>
//               </div>
//             )}
            
//             {paymentMethod === 'mobile' && (
//               <div className="flex items-center justify-center h-32 border rounded-md bg-muted/50">
//                 <div className="text-center">
//                   <Smartphone className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-muted-foreground">Mobile payment</p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
          
//           <CardFooter className="border-t pt-4">
//             <Button 
//               className="w-full" 
//               size="lg"
//               onClick={handleCompleteOrder}
//               disabled={
//                 paymentMethod === 'cash' && 
//                 (parseFloat(amountReceived || '0') < currentOrder.total)
//               }
//             >
//               <Receipt className="mr-2 h-4 w-4" />
//               Complete Payment
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { usePOS } from "@/context/POSContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { PaymentMethod } from "@/lib/types";
import OrderItem from "@/components/OrderItem";
import { ArrowLeft, CreditCard, Receipt, Smartphone, Banknote } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const Checkout = () => {
  const { currentOrder, setOrders,completeOrder } = usePOS();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [amountReceived, setAmountReceived] = useState<string>(
    currentOrder ? currentOrder.total.toFixed(2) : "0.00"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);

    // Reset amount to exact total for card and mobile payments
    if (value === "card" || value === "mobile") {
      setAmountReceived(currentOrder ? currentOrder.total.toFixed(2) : "0.00");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmountReceived(value);
    }
  };

  const calculateChange = (): number => {
    if (!currentOrder) return 0;
    const received = parseFloat(amountReceived || "0");
    return Math.max(0, received - currentOrder.total);
  };

  const handleCompleteOrder = async () => {
    if (!currentOrder) return;
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:5001/api/orders/complete-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: currentOrder.id,
          paymentMethod,
          amount: parseFloat(amountReceived || "0"),
        }),
      });

      if (!response.ok) throw new Error("Payment processing failed");

      // Refresh orders after completion
      const updatedOrders = await fetch("http://localhost:5001/api/orders").then((res) => res.json());
      setOrders(updatedOrders);

      toast.success("Payment successful!");
      completeOrder(paymentMethod, parseFloat(amountReceived || '0'));
    navigate('/');
      // Redirect to orders page
    } catch (error) {
      console.error("Error completing payment:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-fade-in">
        <CreditCard className="h-12 w-12 text-muted mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Active Order</h1>
        <p className="text-muted-foreground mb-6">Select a table and create an order first</p>
        <Button onClick={() => navigate("/tables")}>Go to Tables</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="text-muted-foreground mt-1">Complete order for {currentOrder.tableName}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Order
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <ScrollArea className="h-[450px]">
            <CardContent className="space-y-4">
              {currentOrder.items.map((item) => (
                <OrderItem key={item.id} item={item} editable={false} />
              ))}
            </CardContent>
          </ScrollArea>

          <CardFooter className="flex-col border-t pt-4">
            <div className="w-full flex justify-between mb-2">
              <span className="font-medium">Subtotal</span>
              <span>${currentOrder.total.toFixed(2)}</span>
            </div>
            <div className="w-full flex justify-between pt-2 border-t">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">${currentOrder.total.toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        {/* Payment Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 flex-grow">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="grid grid-cols-3 gap-4">
              <Label
                htmlFor="cash"
                className={`flex flex-col items-center p-4 rounded-md border-2 cursor-pointer hover:bg-accent ${
                  paymentMethod === "cash" ? "border-primary" : "border-transparent"
                }`}
              >
                <RadioGroupItem value="cash" id="cash" className="sr-only" />
                <Banknote className="mb-2 h-6 w-6" />
                <span className="text-sm">Cash</span>
              </Label>

              <Label
                htmlFor="card"
                className={`flex flex-col items-center p-4 rounded-md border-2 cursor-pointer hover:bg-accent ${
                  paymentMethod === "card" ? "border-primary" : "border-transparent"
                }`}
              >
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <CreditCard className="mb-2 h-6 w-6" />
                <span className="text-sm">Card</span>
              </Label>

              <Label
                htmlFor="mobile"
                className={`flex flex-col items-center p-4 rounded-md border-2 cursor-pointer hover:bg-accent ${
                  paymentMethod === "mobile" ? "border-primary" : "border-transparent"
                }`}
              >
                <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
                <Smartphone className="mb-2 h-6 w-6" />
                <span className="text-sm">Mobile</span>
              </Label>
            </RadioGroup>

            {paymentMethod === "cash" && (
              <div>
                <Label htmlFor="amount">Amount Received</Label>
                <Input id="amount" value={amountReceived} onChange={handleAmountChange} />
                <div className="flex justify-between p-3 bg-muted rounded-md">
                  <span>Change Due:</span>
                  <span className="font-bold">${calculateChange().toFixed(2)}</span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t pt-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCompleteOrder}
              disabled={isProcessing || (paymentMethod === "cash" && parseFloat(amountReceived || "0") < currentOrder.total)}
            >
              <Receipt className="mr-2 h-4 w-4" />
              {isProcessing ? "Processing..." : "Complete Payment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
