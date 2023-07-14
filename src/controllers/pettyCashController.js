import PettyCashRequest from "#models/PettyCashRequest";

const createRequest = async (req, res) => {
  const { name, date, accountDetails, authorizedBy, items, total } = req.body;

  try {
    const newPettyCashRequest = new PettyCashRequest({
      name,
      date,
      accountDetails: {
        accountName: accountDetails.accountName,
        bank: accountDetails.bank_name,
        number: accountDetails.number,
      },
      authorizedBy,
      items,
      total,
    });

    await newPettyCashRequest.save();

    res.status(201).send({ newPettyCashRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Try again bozo" });
  }
};

const getRequests = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({});
    res.send(pettyCashRequests);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const getRequest = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);

    return res.json({
      data: pettyCashRequest,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

export { createRequest, getRequests, getRequest };
