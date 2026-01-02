const BankBar = () => {
  const banks = [
    "0% EMI on UPI",
    "Powered by snapmint",
    "IndusInd Bank",
    "HDFC Bank",
    "YES BANK",
    "Powered by TWO",
  ];

  return (
    <div className="bank-bar">
      <div className="container mx-auto flex items-center justify-center gap-8 text-foreground text-sm font-medium overflow-x-auto">
        {banks.map((bank, index) => (
          <span key={index} className="whitespace-nowrap flex items-center gap-2">
            {index > 0 && <span className="w-1.5 h-1.5 bg-foreground rounded-full" />}
            {bank}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BankBar;
