"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const licenses = {
  mp3: `Non-Exclusive License

In this agreement, Russ A Buss is the "Licensor", and the person or entity purchasing the license is referred as "Licensee". By purchasing a license, the Licensee agrees to the terms and conditions outlined in this agreement. Russ A Buss retains all rights to the instrumental and grants the Licensee a license to use the instrumental under certain conditions, as outlined in the following license.

Receive your audio file download link instantly.
Independently sell up to 5,000 copies (upgrade to exclusive license after 5k)
Cannot publish with B.M.I., ASCAP, etc. (upgrading to exclusive license allows this)
Must give credit to Russ A Buss in album/ single credits, not needed on song title.
For commercial usage, must purchase a commercial license.

...`,
  wav: `Non-Exclusive License

In this agreement, Russ A Buss is the "Licensor", and the person or entity purchasing the license is referred as "Licensee". By purchasing a license, the Licensee agrees to the terms and conditions outlined in this agreement. Russ A Buss retains all rights to the instrumental and grants the Licensee a license to use the instrumental under certain conditions, as outlined in the following license.

Receive your audio file download link instantly.
Independently sell up to 5,000 copies (upgrade to exclusive license after 5k)
Cannot publish with B.M.I., ASCAP, etc. (upgrading to exclusive license allows this)
Must give credit to Russ A Buss in album/ single credits, not needed on song title.
For commercial usage, must purchase a commercial license.

...`,
  stems: `Non-Exclusive License

In this agreement, Russ A Buss is the "Licensor", and the person or entity purchasing the license is referred as "Licensee". By purchasing a license, the Licensee agrees to the terms and conditions outlined in this agreement. Russ A Buss retains all rights to the instrumental and grants the Licensee a license to use the instrumental under certain conditions, as outlined in the following license.

Receive your audio file download link instantly.
Independently sell up to 5,000 copies (upgrade to exclusive license after 5k)
Cannot publish with B.M.I., ASCAP, etc. (upgrading to exclusive license allows this)
Must give credit to Russ A Buss in album/ single credits, not needed on song title.
For commercial usage, must purchase a commercial license.

...`,
  exclusive: `Exclusive License

In this agreement, Russ A Buss is the "Licensor", and the person or entity purchasing the license is referred as "Licensee". By purchasing a license, the Licensee agrees to the terms and conditions outlined in this agreement. Russ A Buss retains all rights to the instrumental and grants the Licensee a license to use the instrumental under certain conditions, as outlined in the following license.

Receive your audio file download link instantly.
Stems delivered within 1-3 days.
Independently sell unlimited copies.
Russ A Buss retains 50% publishing rights with BMI, ASCAP, etc.
Must give credit to Russ A Buss in album/ single credits, not needed on song title.
For commercial usage, must purchase a commercial license.

...`
};

const BeatPurchaseSection = () => {
  const [selectedBeat, setSelectedBeat] = useState('');
  const [licenseType, setLicenseType] = useState('');

  const handleAddToCart = async () => {
    // Here you would integrate with Stripe to handle the purchase
    console.log(`Adding ${selectedBeat} with ${licenseType} license to cart`);
    // After successful purchase, you would trigger the download and send emails
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Purchase Beat</h2>
      <div className="grid grid-cols-2 gap-4">
        <Select onValueChange={setSelectedBeat}>
          <SelectTrigger>
            <SelectValue placeholder="Select a beat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beat1">Beat 1</SelectItem>
            <SelectItem value="beat2">Beat 2</SelectItem>
            {/* Add more beats as needed */}
          </SelectContent>
        </Select>
        <Select onValueChange={setLicenseType}>
          <SelectTrigger>
            <SelectValue placeholder="Select license type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mp3">MP3 License</SelectItem>
            <SelectItem value="wav">WAV License</SelectItem>
            <SelectItem value="stems">Stems License</SelectItem>
            <SelectItem value="exclusive">Exclusive License</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={licenseType === 'mp3' ? "secondary" : "outline"} className="w-full" onClick={() => setLicenseType('mp3')}>MP3 License</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>MP3 License</DialogTitle>
              <DialogDescription>{licenses.mp3}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={licenseType === 'wav' ? "secondary" : "outline"} className="w-full" onClick={() => setLicenseType('wav')}>WAV License</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>WAV License</DialogTitle>
              <DialogDescription>{licenses.wav}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={licenseType === 'stems' ? "secondary" : "outline"} className="w-full" onClick={() => setLicenseType('stems')}>Stems License</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Stems License</DialogTitle>
              <DialogDescription>{licenses.stems}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={licenseType === 'exclusive' ? "secondary" : "outline"} className="w-full" onClick={() => setLicenseType('exclusive')}>Exclusive License</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Exclusive License</DialogTitle>
              <DialogDescription>{licenses.exclusive}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Button onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </div>
  );
};

export default BeatPurchaseSection;