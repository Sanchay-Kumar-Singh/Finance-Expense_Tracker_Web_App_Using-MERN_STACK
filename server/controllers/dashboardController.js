// const Income = require("../models/Income");
// const Expense = require("../models/Expense");
// const { isValidObjectId, Types } = require("mongoose");

// //Dashboard data
// exports.getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userObjectId = new Types.ObjectId(String(userId));

//     //Fetch total income $ expenses
//     const toatalIncome = await Income.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);
//     console.log("totalIncome", {
//       toatalIncome,
//       userId: isValidObjectId(userId),
//     });

//     const toatalExpense = await Expense.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);

//     //Get income transactions in the last 60 days
//     const last60DaysIncomeTransactions = await Income.find({
//       userId,
//       date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//     }).sort({ date: -1 });

//     //Get total income for last 60 days
//     const incomeLast60Days = last60DaysIncomeTransactions.reduce(
//       (sum, transaction) => sum + transaction.amount,
//       0
//     );

//     //Get expense transactions in the last 30 days
//     const last30DaysExpenseTransactions = await Expense.find({
//       userId,
//       date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//     }).sort({ date: -1 });

//     //Get total income for last 60 days
//     const expensesLast30Days = last30DaysExpenseTransactions.reduce(
//       (sum, transaction) => sum + transaction.amount,
//       0
//     );

//     //Fetch last 5 transactions (income + expenses)
//     const lastTransactions = [
//       ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
//         (txn) => ({
//           ...txn.toObject(),
//           type: "income",
//         })
//       ),
//       ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
//         (txn) => ({
//           ...txn.toObject(),
//           type: "expense",
//         })
//       ),
//     ].sort((a, b) => b.date - a.date); //sort latest first

//     //Final Response
//     res.json({
//       totalBalance:
//         (toatalIncome[0]?.total || 0) - (toatalExpense[0]?.total || 0),
//       totalIncome: toatalIncome[0]?.total || 0,
//       totalExpense: toatalExpense[0]?.total || 0,
//       last30daysExpenses: {
//         total: expensesLast30Days,
//         transactions: last30DaysExpenseTransactions,
//       },
//       last60DaysIncome: {
//         total: incomeLast60Days,
//         transaction: last60DaysIncomeTransactions,
//       },
//       recentTransactions: lastTransactions,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    // Get logged-in user ID
    const userId = req.user._id;

    // Convert to ObjectId for aggregation
    const userObjectId = new Types.ObjectId(String(userId));

    // ==============================
    // TOTAL INCOME
    // ==============================
    const totalIncomeResult = await Income.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // ==============================
    // TOTAL EXPENSE
    // ==============================
    const totalExpenseResult = await Expense.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // ==============================
    // LAST 60 DAYS INCOME
    // ==============================
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // ==============================
    // LAST 30 DAYS EXPENSES
    // ==============================
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // ==============================
    // RECENT TRANSACTIONS
    // ==============================
    const recentIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpense = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const recentTransactions = [
      ...recentIncome.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),

      ...recentExpense.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // ==============================
    // FINAL RESPONSE
    // ==============================
    res.status(200).json({
      totalBalance:
        (totalIncomeResult[0]?.total || 0) -
        (totalExpenseResult[0]?.total || 0),

      totalIncome: totalIncomeResult[0]?.total || 0,

      totalExpense: totalExpenseResult[0]?.total || 0,

      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions,
    });

  } catch (error) {
    console.log("Dashboard Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};