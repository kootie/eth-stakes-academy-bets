
import React from 'react';
import { Button } from "@/components/ui/button";
import { mockUser } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-web3-dark border-b border-web3-primary/20 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold web3-gradient-text mr-8">Web3 Academy</h1>
          <div className="hidden md:flex space-x-6">
            <Link to="/#dashboard" className="text-white hover:text-web3-secondary transition-colors">Dashboard</Link>
            <Link to="/#courses" className="text-white hover:text-web3-secondary transition-colors">Courses</Link>
            <Link to="/#staking" className="text-white hover:text-web3-secondary transition-colors">Staking</Link>
            <Link to="/#cheering" className="text-white hover:text-web3-secondary transition-colors">Cheering</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            <div className="h-3 w-3 bg-web3-success rounded-full animate-pulse"></div>
            <span className="eth-icon text-sm text-white">{mockUser.stakingBalance} ETH</span>
          </div>
          <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-web3-primary/20 border border-web3-primary/30">
            <span className="text-xs text-white truncate w-24 md:w-32">{mockUser.walletAddress}</span>
          </div>
          <Button className="bg-web3-gradient hover:brightness-110 transition-all text-white">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
