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
    <div className="max-w-3xl mx-auto py-10 px-2 relative transition-colors duration-300">
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight flex items-center justify-center gap-3 transition-colors duration-300">
          <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          AI Order Entry
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 mt-4 max-w-xl mx-auto text-lg transition-colors duration-300">
          Simply type what the customer brought in. Our AI will automatically categorize items and calculate prices.
        </p>
      </div>

      <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-zinc-800/80 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="space-y-8">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-5 py-4 rounded-xl text-sm flex items-center gap-3 shadow-inner transition-colors duration-300"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 uppercase tracking-wider transition-colors duration-300">Customer Name</label>
              <input
                type="text"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. John Doe"
                className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-inner text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 uppercase tracking-wider transition-colors duration-300">Items Description</label>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. 2 shirts, 1 jacket, 3 jeans"
                rows={4}
                className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none shadow-inner text-lg"
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full relative group overflow-hidden bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 shadow-sm dark:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-600 dark:to-indigo-600 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-10 transition-opacity duration-300" />
            {isProcessing ? (
              <>
                <Bot className="w-6 h-6 animate-pulse text-blue-600 dark:text-blue-400 z-10" />
                <span className="text-blue-600 dark:text-blue-400 z-10">AI is Analyzing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform z-10" />
                <span className="z-10">Process Order with AI</span>
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
              <div className="bg-gray-50 dark:bg-zinc-950/80 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-inner relative transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-6 font-semibold text-lg transition-colors duration-300">
                  <CheckCircle className="w-6 h-6" />
                  Successfully Parsed Order
                </div>
                
                <div className="space-y-3 mb-8">
                  {parsedResult.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900/80 p-4 rounded-xl border border-gray-200 dark:border-zinc-800/80 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors duration-300">
                      <span className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300">
                          &times;{item.quantity}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white text-lg transition-colors duration-300">{item.name}</span>
                      </span>
                      <span className="text-gray-500 dark:text-zinc-400 font-medium text-lg transition-colors duration-300">
                        ₹{item.price} <span className="text-gray-400 dark:text-zinc-600 text-sm font-normal">each</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-zinc-800 pt-6 mb-8 transition-colors duration-300">
                  <span className="text-gray-500 dark:text-zinc-400 font-semibold uppercase tracking-wider transition-colors duration-300">Total Amount</span>
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 transition-colors duration-300">₹{parsedResult.total}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:hover:from-emerald-400 dark:hover:to-teal-400 text-white dark:text-zinc-950 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5"
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
