'use client';

import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Plan, PlanPrice } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onSave: (plan: Plan) => void;
  isLoading?: boolean;
}

export default function EditModal({ isOpen, onClose, plan, onSave, isLoading = false }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    participantCount: '',
    benefits: [] as string[],
    currentBenefit: '',
    planPrices: [] as PlanPrice[],
    currentPriceType: 'month' as 'free' | 'month' | 'year',
    currentPrice: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (plan) {
      setFormData({
        title: plan.title,
        participantCount: plan.participantCount.toString(),
        benefits: plan.benefits || [],
        currentBenefit: '',
        planPrices: plan.planPrices || [],
        currentPriceType: 'month',
        currentPrice: '',
      });
      setErrors({});
    }
  }, [plan]);

  if (!isOpen || !plan) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.participantCount || parseInt(formData.participantCount) <= 0) {
      newErrors.participantCount = 'Valid participant count is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...plan,
      title: formData.title,
      participantCount: parseInt(formData.participantCount),
      benefits: formData.benefits,
      planPrices: formData.planPrices,
    });
  };

  const addBenefit = () => {
    if (formData.currentBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, formData.currentBenefit.trim()],
        currentBenefit: '',
      });
    }
  };

  const addPrice = () => {
    if (formData.currentPriceType === 'free') {
      const exists = formData.planPrices.some(p => p.type === 'free');
      if (!exists) {
        setFormData({
          ...formData,
          planPrices: [...formData.planPrices, { type: 'free', price: 0 }],
        });
      }
    } else if (formData.currentPrice && parseFloat(formData.currentPrice) >= 0) {
      const newPrice: PlanPrice = {
        type: formData.currentPriceType,
        price: parseFloat(formData.currentPrice),
      };

      setFormData({
        ...formData,
        planPrices: [...formData.planPrices, newPrice],
        currentPrice: '',
      });
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const removePrice = (index: number) => {
    setFormData({
      ...formData,
      planPrices: formData.planPrices.filter((_, i) => i !== index),
    });
  };

  const getPriceTypeLabel = (type: string) => {
    switch (type) {
      case 'free': return 'Free';
      case 'month': return 'Monthly';
      case 'year': return 'Yearly';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-200 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Plan</h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Update pricing structure and benefits for {formData.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Plan Name
            </label>
            <input
              type="text"
              disabled
              value={formData.title}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 capitalize opacity-80 cursor-not-allowed"
            />
          </div>

          {/* Participant Count */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Participant Count *
            </label>
            <input
              type="number"
              value={formData.participantCount}
              onChange={(e) => {
                setFormData({ ...formData, participantCount: e.target.value });
                if (e.target.value) setErrors((prev) => ({ ...prev, participantCount: '' }));
              }}
              className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#8E25E3]/30 focus:border-[#8E25E3] focus:outline-none transition-all shadow-2xs ${
                errors.participantCount ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
              }`}
            />
            {errors.participantCount && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.participantCount}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Pricing
            </label>
            <div className="flex gap-2 mb-2">
              <Select
                value={formData.currentPriceType}
                onValueChange={(val) => setFormData({ ...formData, currentPriceType: val as "free" | "month" | "year" })}
              >
                <SelectTrigger className="flex-1 h-[44px] px-4 py-5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/30 focus:border-[#8E25E3] transition-all cursor-pointer shadow-2xs">
                  <SelectValue placeholder="Price Type" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg border border-gray-200 shadow-lg z-[60]">
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.currentPrice}
                onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                disabled={formData.currentPriceType === 'free'}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#8E25E3]/30 focus:border-[#8E25E3] focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:bg-gray-50"
              />
              <button
                type="button"
                onClick={addPrice}
                className="px-4 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold rounded-lg cursor-pointer transition-colors flex items-center justify-center shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {formData.planPrices.map((price, index) => (
                <div key={index} className="flex items-center justify-between px-3.5 py-3 bg-purple-50/60 border border-purple-100 rounded-lg">
                  <span className="text-xs font-semibold text-gray-800">
                    {getPriceTypeLabel(price.type)}: {price.type === 'free' ? 'Free' : `$${price.price}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePrice(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Benefits
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter benefit here..."
                value={formData.currentBenefit}
                onChange={(e) => setFormData({ ...formData, currentBenefit: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#8E25E3]/30 focus:border-[#8E25E3] focus:outline-none transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-3 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold rounded-lg cursor-pointer transition-colors flex items-center justify-center shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between px-3.5 py-3 bg-purple-50/60 border border-purple-100 rounded-lg">
                  <span className="text-xs font-semibold text-gray-800">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold rounded-lg shadow-xs text-sm transition-colors cursor-pointer disabled:opacity-60"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}