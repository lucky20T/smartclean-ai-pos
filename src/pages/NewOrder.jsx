import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Bot, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
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
      
      const pricing = {
        shirt: { name: 'Shirt', price: 20 },
        shirts: { name: 'Shirt', price: 20 },
        jeans: { name: 'Jeans', price: 30 },
        jean: { name: 'Jeans', price: 30 },
        jacket: { name: 'Jacket', price: 50 },
        jackets: { name: 'Jacket', price: 50 }
      };

      const segments = input.toLowerCase().split(',');
      
      segments.forEach(segment => {
        const parts = segment.trim().split(/\s+/);
        let quantity = 1;
        let matchedItem = null;

        for (const part of parts) {
          const num = parseInt(part, 10);
          if (!isNaN(num)) {
            quantity = num;
          } else {
            const cleanPart = part.replace(/[^\w]/g, '');
            if (pricing[cleanPart]) {
              matchedItem = pricing[cleanPart];
            }
          }
        }

        if (matchedItem) {
          items.push({ 
            name: matchedItem.name, 
            quantity, 
            price: matchedItem.price
          });
          total += (quantity * matchedItem.price);
        }
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
      status: 'Pending',
      date: new Date().toISOString()
    };
    
    addOrder(newOrder);
    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
          <Wand2 className="w-8 h-8 text-blue-400" />
          AI Order Entry
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Simply type what the customer brought in. Our AI will automatically categorize items and calculate prices.
        </p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
        <div className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Customer Name</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. John Doe"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Items Description</label>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. 2 shirts, 1 jacket, 3 jeans"
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Bot className="w-5 h-5 animate-pulse" />
                AI is Analyzing...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Process Order
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
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-2 text-emerald-400 mb-4 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Successfully Parsed Order
                </div>
                
                <div className="space-y-3 mb-6">
                  {parsedResult.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-gray-300 text-sm bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white border border-gray-600">
                          &times;{item.quantity}
                        </span>
                        <span className="font-medium text-gray-200">{item.name}</span>
                      </span>
                      <span className="text-gray-400 font-medium">
                        ₹{item.price} <span className="text-gray-500 text-xs font-normal">each</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-700 pt-4 mb-6">
                  <span className="text-gray-400 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-400">₹{parsedResult.total}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Confirm & Create Order
                  <ArrowRight className="w-5 h-5" />
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
