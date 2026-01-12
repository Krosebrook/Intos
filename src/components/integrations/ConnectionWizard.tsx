import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { IntegrationConfig } from '../../lib/integration-types';

interface ConnectionWizardProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  onSave: (config: Partial<IntegrationConfig>) => void;
}

export function ConnectionWizard({ isOpen, onClose, serviceId, onSave }: ConnectionWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<Partial<IntegrationConfig>>({
    serviceId,
    syncDirection: 'two-way',
    syncFrequency: 'hourly',
  });

  const handleNext = () => {
    if (step === 2) {
      // Simulate OAuth/Auth check
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
      }, 1500);
    } else if (step === 4) {
      // Simulate Test Connection
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    onSave(config);
    onClose();
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0F213C] border-white/10 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure {serviceId} Integration</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2
                  ${step >= s 
                    ? 'border-[#0097A9] bg-[#0097A9] text-white' 
                    : 'border-white/20 text-[#A8B2C1]'}
                `}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                <span className="text-[10px] text-[#A8B2C1] uppercase tracking-wider">
                  {s === 1 ? 'Auth' : s === 2 ? 'Direction' : s === 3 ? 'Mapping' : s === 4 ? 'Test' : 'Done'}
                </span>
              </div>
            ))}
          </div>

          <div className="min-h-[200px]">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <p className="text-[#A8B2C1] text-sm">Connect your {serviceId} account to allow data access.</p>
                <div className="p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E27305]/20 flex items-center justify-center">
                      <span className="font-bold text-[#E27305]">{serviceId.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">OAuth 2.0</div>
                      <div className="text-xs text-[#A8B2C1]">Secure connection</div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-white/10" onClick={() => setStep(2)}>
                    Connect
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sync Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Sync Direction</Label>
                    <Select 
                      value={config.syncDirection} 
                      onValueChange={(val: any) => setConfig({...config, syncDirection: val})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="two-way">Two-Way Sync (Bi-directional)</SelectItem>
                        <SelectItem value="one-way-in">Import Only (One-Way)</SelectItem>
                        <SelectItem value="one-way-out">Export Only (One-Way)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sync Frequency</Label>
                    <Select 
                      value={config.syncFrequency} 
                      onValueChange={(val: any) => setConfig({...config, syncFrequency: val})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-time">Real-time (Webhook)</SelectItem>
                        <SelectItem value="15-min">Every 15 minutes</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Field Mapping</h3>
                <p className="text-[#A8B2C1] text-sm">Map fields from {serviceId} to INT OS.</p>
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-2 text-xs text-[#A8B2C1] px-2">
                    <div className="col-span-3">External Field</div>
                    <div className="col-span-1 text-center">→</div>
                    <div className="col-span-3">INT OS Field</div>
                  </div>
                  {['Email', 'First Name', 'Last Name', 'Company'].map((field) => (
                    <div key={field} className="grid grid-cols-7 gap-2 items-center p-2 bg-white/5 rounded border border-white/10">
                      <div className="col-span-3 text-sm">{field}</div>
                      <div className="col-span-1 text-center text-[#A8B2C1]">→</div>
                      <div className="col-span-3">
                        <Select defaultValue={field.toLowerCase().replace(' ', '_')}>
                          <SelectTrigger className="h-8 bg-transparent border-white/10 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">contact_email</SelectItem>
                            <SelectItem value="first_name">first_name</SelectItem>
                            <SelectItem value="last_name">last_name</SelectItem>
                            <SelectItem value="company">company_name</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-center py-8">
                 {loading ? (
                   <div className="flex flex-col items-center gap-4">
                     <Loader2 className="w-8 h-8 animate-spin text-[#0097A9]" />
                     <p>Testing connection with sample data...</p>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                       <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <h3 className="text-lg font-medium">Test Successful!</h3>
                     <p className="text-[#A8B2C1]">We successfully synced 5 sample records.</p>
                   </div>
                 )}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4 text-center py-8">
                 <div className="w-16 h-16 mx-auto rounded-full bg-[#E27305]/20 flex items-center justify-center text-[#E27305] mb-4">
                   <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold">Integration Active</h3>
                 <p className="text-[#A8B2C1]">Your integration with {serviceId} is now live and will sync according to your schedule.</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
          
          {step < 5 ? (
            <Button 
              onClick={handleNext} 
              disabled={loading}
              className="bg-[#0097A9] hover:bg-[#00B8CC] text-white"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {step === 4 ? 'Run Test' : 'Next Step'}
              {!loading && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          ) : (
            <Button 
              onClick={handleFinish}
              className="bg-[#E27305] hover:bg-[#FF8811] text-white"
            >
              Finish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
