
import React, { createContext, useContext, ReactNode } from "react";
import { useWallet, WalletInfo } from "@/utils/walletConnector";

interface WalletContextType {
  wallet: WalletInfo;
  isLoading: boolean;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  getShortAddress: (address: string) => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const walletUtils = useWallet();
  
  return (
    <WalletContext.Provider value={walletUtils}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
