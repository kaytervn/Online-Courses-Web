import InvoiceItem from "../models/InvoiceItemModel.js";
import Invoice from "../models/InvoiceModel.js";
import User from "../models/UserModel.js";
import Course from "../models/CourseModel.js";

const getAllInvoiceItemsAdmin = async (req, res) => {
  const UserAuth = await User.findById(req.user._id);
  if (!(UserAuth.role == "ADMIN")) {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    var statistics = [];

    const invoiceItems = await InvoiceItem.find();
    if (invoiceItems.length === 0) {
      return res.status(404).json({ message: "Don't have any invoice items" });
    }

    const newInvoiceItems = await Promise.all(
      invoiceItems.map(async (invoiceItem) => {
        const course = await Course.findById(invoiceItem.courseId);
        const invoice = await Invoice.findById(invoiceItem.invoiceId);
        const user = await User.findById(invoice.userId);
        statistics.push({
          invoiceItem,
          courseName: course.title,
          coursePrice: course.price,
          userName: user.name,
        });
        return {};
      })
    );

    res.status(200).json({ statistics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllInvoiceItemsAdmin };
