import mongoose from "mongoose";
import PaymentMethod from "./PaymentMethodEnum";

const InvoiceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        paymentMethod:{
            type: PaymentMethod,
            required: true,
        },
    
    },
    {
        timestamps: true,
    }
)

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;