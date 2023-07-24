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
      user: req.user._id,
    });

    await newPettyCashRequest.save();

    res.status(201).send({ newPettyCashRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Try again bozo" });
  }
};

const getUserRequests = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      user: req.user._id,
    }).populate("user");
    res.send(pettyCashRequests);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({}).populate("user");
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

    if (!pettyCashRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.json({
      data: pettyCashRequest,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);

    if (!pettyCashRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (pettyCashRequest.status !== "pending") {
      return res
        .status(422)
        .json({ error: "Request has already been attended to" });
    }

    await PettyCashRequest.findByIdAndUpdate(pettyCashRequest._id, {
      status: "approved",
    });
    return res.json({ message: "Request approved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);

    if (!pettyCashRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (pettyCashRequest.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Request has already been attended to" });
    }

    await PettyCashRequest.findByIdAndUpdate(pettyCashRequest._id, {
      status: "rejected",
    });
    return res.json({ message: "Request rejected successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  createRequest,
  getRequests,
  getRequest,
  getUserRequests,
  approveRequest,
  rejectRequest,
};
