
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useWalletContext } from "@/contexts/WalletContext";
import { LogOut, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, isLoading, connectWallet, disconnectWallet, getShortAddress } = useWalletContext();

  const handleNavigation = (hash: string) => {
    navigate(`/#${hash}`);
  };

  return (
    <nav className="bg-web3-dark border-b border-web3-primary/20 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold web3-gradient-text mr-8">Web3 Academy</h1>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => handleNavigation('dashboard')} className="text-white hover:text-web3-secondary transition-colors">Dashboard</button>
            <button onClick={() => handleNavigation('courses')} className="text-white hover:text-web3-secondary transition-colors">Courses</button>
            <button onClick={() => handleNavigation('staking')} className="text-white hover:text-web3-secondary transition-colors">Staking</button>
            <button onClick={() => handleNavigation('cheering')} className="text-white hover:text-web3-secondary transition-colors">Cheering</button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {wallet.isConnected ? (
            <>
              <div className="hidden md:flex items-center space-x-1">
                <div className="h-3 w-3 bg-web3-success rounded-full animate-pulse"></div>
                <span className="eth-icon text-sm text-white">{wallet.balance} ETH</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer hidden md:flex items-center px-3 py-1 rounded-full bg-web3-primary/20 border border-web3-primary/30">
                    <span className="text-xs text-white truncate w-24 md:w-32">{getShortAddress(wallet.address)}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={disconnectWallet}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              className="bg-web3-gradient hover:brightness-110 transition-all text-white"
              onClick={connectWallet}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
