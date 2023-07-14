import axios from "axios";

const resolveBank = async (req, res) => {
  const { account_number, bank_code } = req.body;
  try {
    const response = await axios.get("https://api.paystack.co/bank/resolve", {
      params: {
        account_number,
        bank_code,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Could not resolve details" });
  }
};

const getBanks = async (req, res) => {
  try {
    const response = await fetch("https://api.paystack.co/bank?currency=NGN", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not resolve details" });
  }
};

export { resolveBank, getBanks };
