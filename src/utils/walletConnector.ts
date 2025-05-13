
// Simple Ethereum wallet connector for Web3 Academy
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export interface WalletInfo {
  address: string;
  balance: string;
  chainId: string;
  isConnected: boolean;
}

// Check if Ethereum provider is available in the browser
export const hasMetaMask = (): boolean => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
};

// Returns current wallet state and connection methods
export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: "",
    balance: "0",
    chainId: "",
    isConnected: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update wallet state when connected
  const updateWalletState = async () => {
    if (!hasMetaMask()) return;

    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });
      
      if (accounts.length === 0) {
        setWallet({
          address: "",
          balance: "0",
          chainId: "",
          isConnected: false,
        });
        return;
      }
      
      const address = accounts[0];
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      
      // Convert balance from wei (hex) to ETH (decimal with 4 decimal places)
      const balanceInWei = parseInt(balanceHex, 16);
      const balanceInEth = (balanceInWei / 10**18).toFixed(4);
      
      setWallet({
        address,
        balance: balanceInEth,
        chainId,
        isConnected: true,
      });
    } catch (error) {
      console.error("Error updating wallet state:", error);
      toast({
        title: "Wallet Error",
        description: "Failed to update wallet information",
        variant: "destructive",
      });
    }
  };

  // Connect wallet
  const connectWallet = async (): Promise<boolean> => {
    if (!hasMetaMask()) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      await updateWalletState();
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected",
      });
      
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect your wallet",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet (this is a simulated disconnect since MetaMask doesn't support programmatic disconnect)
  const disconnectWallet = () => {
    setWallet({
      address: "",
      balance: "0",
      chainId: "",
      isConnected: false,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  // Format address for display
  const getShortAddress = (address: string): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Listen for account changes
  useEffect(() => {
    if (!hasMetaMask()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else {
        // Account changed, update state
        updateWalletState();
      }
    };

    const handleChainChanged = () => {
      // Chain changed, reload page as recommended by MetaMask
      window.location.reload();
    };

    // Set up listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    // Initial check
    updateWalletState();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return {
    wallet,
    isLoading,
    connectWallet,
    disconnectWallet,
    updateWalletState,
    getShortAddress,
  };
};

// Add window.ethereum type definition
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
