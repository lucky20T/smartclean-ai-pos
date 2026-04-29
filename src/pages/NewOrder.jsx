import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Bot, CheckCircle, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {
  const [input, setInput] = useState('');
  const [customer, setCustomer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);
  const [error, setError] = useState('');
  
  const addOrder = useStore(state => state.addOrder);
  const navigate = useNavigate();

  const handleProcess = () => {
    if (!customer.trim()) {
      setError('Please enter customer name');
      return;
    }
    if (!input.trim()) {
      setError('Please enter order details');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    setParsedResult(null);

    // Mock AI processing delay
    setTimeout(() => {
      const items = [];
      let total = 0;
      
      const segments = input.toLowerCase().split(',');
      
      segments.forEach(segment => {
        const cleanSegment = segment.trim();
        if (!cleanSegment) return;

        const match = cleanSegment.match(/^(\d+)?\s*(.+)$/);
        if (!match) return;

        const quantity = match[1] ? parseInt(match[1], 10) : 1;
        const rawName = match[2].trim();
        
        let price = 25;
        let finalName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        if (rawName.includes('shirt') || rawName.includes('top') || rawName.includes('blouse') || rawName.includes('tshirt')) {
          price = 20;
        } else if (rawName.includes('jean') || rawName.includes('pant') || rawName.includes('trouser')) {
          price = 30;
        } else if (rawName.includes('jacket') || rawName.includes('coat') || rawName.includes('hoodie') || rawName.includes('sweater')) {
          price = 50;
        } else if (rawName.includes('bed') || rawName.includes('sheet') || rawName.includes('blanket') || rawName.includes('duvet') || rawName.includes('pillow')) {
          price = 60;
        } else if (rawName.includes('suit') || rawName.includes('blazer')) {
          price = 100;
        } else if (rawName.includes('dress') || rawName.includes('skirt')) {
          price = 40;
        } else if (rawName.includes('towel')) {
          price = 15;
        }

        items.push({ name: finalName, quantity, price });
        total += (quantity * price);
      });
      
      setIsProcessing(false);

      if (items.length === 0) {
        setError('No valid items recognized. Please try e.g. "2 shirts, 1 jacket".');
        return;
      }

      setParsedResult({ items, total });
    }, 1500);
  };

  const handleConfirm = () => {
    if (!parsedResult) return;
    
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customer,
      items: parsedResult.items,
      total: parsedResult.total,
      status: 'Received',
      date: new Date().toISOString()
    };
    
    addOrder(newOrder);
    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-2 relative">
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-400" />
          AI Order Entry
        </h1>
        <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-lg">
          Simply type what the customer brought in. Our AI will automatically categorize items and calculate prices.
        </p>
      </div>

      <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-zinc-800/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="space-y-8">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl text-sm flex items-center gap-3 shadow-inner"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Customer Name</label>
              <input
                type="text"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. John Doe"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-inner text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Items Description</label>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. 2 shirts, 1 jacket, 3 jeans"
                rows={4}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none shadow-inner text-lg"
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full relative group overflow-hidden bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700 hover:border-zinc-600 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            {isProcessing ? (
              <>
                <Bot className="w-6 h-6 animate-pulse text-blue-400" />
                <span className="text-blue-400">AI is Analyzing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 text-blue-400 group-hover:rotate-12 transition-transform" />
                Process Order with AI
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {parsedResult && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800 shadow-inner relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-2 text-emerald-400 mb-6 font-semibold text-lg">
                  <CheckCircle className="w-6 h-6" />
                  Successfully Parsed Order
                </div>
                
                <div className="space-y-3 mb-8">
                  {parsedResult.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-300 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <span className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white border border-zinc-700 shadow-sm">
                          &times;{item.quantity}
                        </span>
                        <span className="font-medium text-white text-lg">{item.name}</span>
                      </span>
                      <span className="text-zinc-400 font-medium text-lg">
                        ₹{item.price} <span className="text-zinc-600 text-sm font-normal">each</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-6 mb-8">
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider">Total Amount</span>
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">₹{parsedResult.total}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5"
                >
                  Confirm & Create Order
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewOrder;
