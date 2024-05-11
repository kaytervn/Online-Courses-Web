const getAllInvoiceItemsAdmin = async () => {
  const res = await fetch(`/api/invoiceItems/all/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
  });

  const { statistics } = await res.json();
  return statistics;
};

export { getAllInvoiceItemsAdmin };
