import PettyCashRequest from "#models/PettyCashRequest";
import handleUpload from "#utils/upload";

const createRequest = async (req, res) => {
  const { name, date, accountDetails, authorizedBy, items, total } = req.body;

  try {
    const cldRes = req.file ? await handleUpload(req) : {};

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
      imageUrl: cldRes.secure_url,
    });

    await newPettyCashRequest.save();
    res.status(201).send({ newPettyCashRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Try again bozo" });
  }
};

// const getUserRequests = async (req, res) => {
//   try {
//     const pettyCashRequests = await PettyCashRequest.find({
//       user: req.user._id,
//     }).populate("user");
//     res.send(pettyCashRequests);
//   } catch (error) {
//     return res.status(400).json({
//       message: "Something went wrong.",
//     });
//   }
// };

const getUserRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    /**
     * @type {String|undefined}
     */
    const { q } = req.query;
    const formsPerPage = 20;
    const query = !q?.length
      ? {}
      : {
          $or: [
            // { _id: q },
            { username: new RegExp(q, "i") },
            { name: new RegExp(q, "i") },
          ],
        };

    const totalCount = await PettyCashRequest.countDocuments({
      user: req.user._id,
      ...query,
    });
    const totalPages = Math.ceil(totalCount / formsPerPage);

    const skipForms = (page - 1) * formsPerPage;

    const pettyCashRequests = await PettyCashRequest.find({
      user: req.user._id,
      ...query,
    })
      .populate("user")
      .sort({ createdAt: -1 })
      .skip(skipForms)
      .limit(formsPerPage);
    res.send({
      totalPages,
      currentPage: page,
      forms: pettyCashRequests,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    /**
     * @type {String|undefined}
     */
    const { q } = req.query;
    console.log(q);
    const formsPerPage = 16;

    const totalCount = await PettyCashRequest.countDocuments({});

    const totalPages = Math.ceil(totalCount / formsPerPage);

    const skipForms = (page - 1) * formsPerPage;
    const query = !q?.length
      ? {}
      : {
          $or: [
            // { _id: q },
            { username: new RegExp(q, "i") },
            { name: new RegExp(q, "i") },
          ],
        };
    console.log(query);
    const pettyCashRequests = await PettyCashRequest.find(query)
      .populate("user")
      .sort({ createdAt: -1 })
      .skip(skipForms)
      .limit(formsPerPage);

    res.send({
      totalPages,
      currentPage: page,
      forms: pettyCashRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      status: "pending",
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.send({ forms: pettyCashRequests });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getPendingRequestsUser = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      user: req.user._id,
      status: "pending",
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.send({ forms: pettyCashRequests });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getApprovedRequests = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      status: "approved",
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.send({ forms: pettyCashRequests });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
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


const approveRequestFinal = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);

    if (!pettyCashRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (pettyCashRequest.superadminstatus !== "pending") {
      return res
        .status(422)
        .json({ error: "Request has already been attended to" });
    }

    await PettyCashRequest.findByIdAndUpdate(pettyCashRequest._id, {
      superadminstatus: "approved",
    });
    return res.json({ message: "Request approved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);
    const { rejectReason } = req.body;
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
      rejectReason,
    });
    return res.json({ message: "Request rejected successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};


const rejectRequestFinal = async (req, res) => {
  try {
    const pettyCashRequest = await PettyCashRequest.findById(req.params.id);
    const { rejectReasonFinal } = req.body;
    if (!pettyCashRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (pettyCashRequest.superadminstatus !== "pending") {
      return res
        .status(400)
        .json({ error: "Request has already been attended to" });
    }

    await PettyCashRequest.findByIdAndUpdate(pettyCashRequest._id, {
      superadminstatus: "rejected",
      rejectReasonFinal,
    });
    return res.json({ message: "Request rejected successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getStats = async (req, res) => {
  try {
    const totalCount = await PettyCashRequest.countDocuments({});
    const approvedCount = await PettyCashRequest.countDocuments({
      status: "approved",
    });
    const rejectedCount = await PettyCashRequest.countDocuments({
      status: "rejected",
    });
    const pendingCount = await PettyCashRequest.countDocuments({
      status: "pending",
    });

    res.json({
      totalForms: totalCount,
      approvedForms: approvedCount,
      rejectedForms: rejectedCount,
      pendingForms: pendingCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getUserStats = async (req, res) => {
  try {
    const totalCount = await PettyCashRequest.countDocuments({
      user: req.user._id,
    });
    const approvedCount = await PettyCashRequest.countDocuments({
      user: req.user._id,
      status: "approved",
    });
    const rejectedCount = await PettyCashRequest.countDocuments({
      user: req.user._id,
      status: "rejected",
    });
    const pendingCount = await PettyCashRequest.countDocuments({
      user: req.user._id,
      status: "pending",
    });

    res.json({
      totalForms: totalCount,
      approvedForms: approvedCount,
      rejectedForms: rejectedCount,
      pendingForms: pendingCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getReport = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      status: req.params.status,
    });
    res.render("export", { pettyCashRequests });
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllReport = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({});
    res.render("export", { pettyCashRequests });
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserReport = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      user: req.user._id,
      status: req.params.status,
    });
    res.render("export", { pettyCashRequests });
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllUserReport = async (req, res) => {
  try {
    const pettyCashRequests = await PettyCashRequest.find({
      user: req.user._id,
    });
    res.render("export", { pettyCashRequests });
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  createRequest,
  getRequests,
  getRequest,
  getUserRequests,
  getPendingRequests,
  getPendingRequestsUser,
  getApprovedRequests,
  approveRequest,
  approveRequestFinal,
  rejectRequest,
  rejectRequestFinal,
  getStats,
  getUserStats,
  getReport,
  getAllReport,
  getUserReport,
  getAllUserReport,
};
