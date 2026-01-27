'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/lib/SettingProvider";
import {  ALargeSmallIcon, ContrastIcon, Eye, Keyboard, MessageCircle, Mic2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Page(){
    const [mount, setMount] = useState(false)
    const [visual,setVisual] = useState({textsize: '25', contrastmode:'Normal', colorvision:'Normal Vision', reducemotion:false}) //variable for visual settings
    const [audioSetting,setAudioSetting] = useState({screenreadersupport:false, voicecommands:false, soundeffects:false}) //variable for audio settings
    const [navSetting,setNavSetting] = useState({enhancedkeyboardnav:false, enhancedfocusind:false, skipnavlinks:false}) //variable for navigation settings
    const [communicationSetting,setCommunicationSetting] = useState({autocaptions:false, signlanguagesupport:false, messageformat:'Text Messages'}) //variable for communication settings
    const [unsavedChanges, setUnsavedChanges] = useState(false) //variable to save changes
    const theme = useSettingsStore(s => s.theme)

    
    function changeVisualSetting(setting,value){
        if(setting === 'textsize'){
            setVisual(prev => ({ ...prev, textsize : `${value}`}))
            setUnsavedChanges(true)
            
        }
        else if(setting === 'contrastmode'){
            setVisual(prev => ({ ...prev, contrastmode : `${value}`}))
            setUnsavedChanges(true)
        }
        else if(setting === 'colorvision'){
            setVisual(prev => ({ ...prev, colorvision : `${value}`}))
            setUnsavedChanges(true)

        }
        else if(setting === 'reducemotion'){
            setVisual(prev => ({ ...prev, reducemotion : value}))
            setUnsavedChanges(true)            
        } 
        else{
            alert('Select from the options')
        }
    }

    function changeAudioSettings(setting,value){
        if(setting === 'soundeffects'){
            setAudioSetting(prev => ({ ...prev, soundeffects : value}))
            setUnsavedChanges(true)
        }
        else if(setting === 'screenreadersupport'){
            setAudioSetting(prev => ({ ...prev, screenreadersupport : value}))
            setUnsavedChanges(true)
        }
        else if(setting === 'voicecommands'){
            setAudioSetting(prev => ({ ...prev, voicecommands : value}))
            setUnsavedChanges(true)
        } else{
            return
        }

    }

    function changeNavSettings(setting,value){
        console.log(setting,value)
        if(setting === 'enhancedkeyboardnav'){
            setNavSetting(prev => ({ ...prev, enhancedkeyboardnav : value}))
            setUnsavedChanges(true)
        }
        else if(setting === 'enhancedfocusind'){
            setNavSetting(prev => ({ ...prev, enhancedfocusind : value}))
            setUnsavedChanges(true)
        }
        else if(setting === 'skipnavlinks'){
            setNavSetting(prev => ({ ...prev, skipnavlinks : value}))
            setUnsavedChanges(true)
        } else{
            return 
        }

    }

    function changeCommunicationSettings(setting,value){
       
        if(setting === 'messageformat'){
            setCommunicationSetting(prev => ({ ...prev, messageformat : `${value}`}))
            setUnsavedChanges(true)
        }
        else if(setting === 'autocaptions'){
 
            setCommunicationSetting(prev => ({ ...prev, autocaptions : value}))
            setUnsavedChanges(true)
        }
        else if(setting === 'signlanguagesupport'){
            setCommunicationSetting(prev => ({ ...prev, signlanguagesupport : value}))
            setUnsavedChanges(true)
        } else{
            return 
        }

    }

    function saveChanges(){
        
     console.log(theme)

    }


    return(
        <>
            <div className=" w-full h-max flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-y-8">

                <div className="w-full h-max flex flex-col gap-2 py-4 lg:col-span-2 md:flex-row md:justify-between">
                    <div className="flex h-fit flex-col gap-2">
                        <h2 className="text-xl font-bold">Accessibility Settings</h2>
                        <span className="text-sm text-neutral-600 max-w-lg">Customize your Inclove experience to match your needs. These settings will be saved and applied across the entire platform.</span>
                    </div>
                    <div>
                        <Button variant={'default'} disabled={!unsavedChanges} onClick={saveChanges}>save</Button>
                    </div>
                </div>
                
                
                {/* visual setting */}
                <Card className={'w-full h-max max-w-lg'}>
                    <CardHeader className={' h-fit flex flex-col gap-1'}>
                        <span className="w-fit flex items-center gap-2"><Eye size={16}/> Visual Settings</span>
                        <span className="text-sm text-neutral-500">Adjust display options for better visibility</span>
                        <div className="w-[99%] h-0.5 bg-neutral-200 mt-2"></div>   
                    </CardHeader>
                    <CardContent className={'w-full h-fit flex flex-col gap-8'}>
                        <ThemeSwitcher/>
                        <div className="w-full h-fit flex justify-between items-start">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Text Size</span>
                                <span className="text-sm text-neutral-500">Increase or decrease text size</span>
                            </div> 
                            <div className="w-1/2 h-fit flex flex-col items-start pt-2">
                                <Slider defaultValue={[25]} max={100} min={0} step={25} className={'w-full h-fit'} 
                                onValueChange={(e)=>{ changeVisualSetting('textsize',e[0])
                                }} />

                                <div className="w-full h-fit flex justify-between mt-2">
                                    <div className="">s</div>
                                    <div className="">m</div>
                                    <div className="">l</div>
                                    <div className="">xl</div>
                                </div>
                            </div>                          
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Contrast Mode</span>
                                <span className="text-sm text-neutral-500">Increase contrast for better readability</span>
                            </div>
                            <Select onValueChange={(e)=>{changeVisualSetting('contrastmode',e)}} value={visual.contrastmode}>
                                <SelectTrigger className={'w-28'}>
                                    <SelectValue  placeholder='Normal'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem  value="Normal">Normal</SelectItem>
                                        <SelectItem value="High Contrast">High Contrast</SelectItem>
                                        <SelectItem value="Dark Mode">Dark Mode</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Color Vision</span>
                                <span className="text-sm text-neutral-500">Adjust color for color vision differences</span>
                            </div>
                            <Select onValueChange={(e)=>{changeVisualSetting('colorvision',e)}} value={visual.colorvision}>
                                <SelectTrigger className={'w-max max-w-[150px]'}>
                                    <SelectValue placeholder='Normal Vision'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Normal Vision">Normal Vision</SelectItem>
                                        <SelectItem value="Red-Blind (Protanopia)">{`Red-Blind (Protanopia)`}</SelectItem>
                                        <SelectItem value="Green-Blind (Deuteranopia)">{`Green-Blind (Deuteranopia)`}</SelectItem>
                                        <SelectItem value="Blue-Blind (Tritanopia)">{`Blue-Blind (Tritanopia)`}</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Reduce Motion</span>
                                <span className="text-sm text-neutral-500">Minimize animations and transitions</span>
                            </div>
                            <Switch id="reduce-motion" checked={visual.reducemotion} onCheckedChange={(e)=>{changeVisualSetting('reducemotion',e)}}/>
                            
                        </div>
                    </CardContent>
                </Card>

                {/* audio settings */}
                 <Card className={'w-full h-max max-w-lg lg:h-full'}>
                    <CardHeader className={' h-fit flex flex-col gap-1'}>
                        <span className="w-fit flex items-center gap-2"><Mic2 size={16} /> Audio Settings</span>
                        <span className="text-sm text-neutral-500">Configure sound and voice options</span>
                        <div className="w-[99%] h-0.5 bg-neutral-200 mt-2"></div>
                    </CardHeader>
                    <CardContent className={'w-full h-fit flex flex-col gap-8'}>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Screen Reader Support</span>
                                <span className="text-sm text-neutral-500">Enable enhanced screen reader compatibility</span>
                            </div>
                            <Switch id="screen-reader-support" checked={audioSetting.screenreadersupport} onCheckedChange={(e)=>changeAudioSettings('screenreadersupport',e)}/>                            
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Voice Commands</span>
                                <span className="text-sm text-neutral-500">Control the app with voice commands</span>
                            </div>
                            <Switch id="voice-commands" checked={audioSetting.voicecommands} onCheckedChange={(e)=>changeAudioSettings('voicecommands',e)}/>                            
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Sound Effects</span>
                                <span className="text-sm text-neutral-500">Play sounds for notifications and interactions</span>
                            </div>
                            <Switch checked={audioSetting.soundeffects} onCheckedChange={(e)=>changeAudioSettings('soundeffects',e)} id="sound-effects"/>                            
                        </div>
                    </CardContent>
                </Card>

                {/* nav setting */}
                <Card className={'w-full h-max max-w-lg'}>
                    <CardHeader className={' h-fit flex flex-col gap-1'}>
                        <span className="w-fit flex items-center gap-2"><Keyboard size={16}/> Navigation Settings</span>
                        <span className="text-sm text-neutral-500">Customize how you navigate the platform</span>
                        <div className="w-[99%] h-0.5 bg-neutral-200 mt-2"></div>
                    </CardHeader>
                    <CardContent className={'w-full h-fit flex flex-col gap-8'}>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Enhanced Keyboard Navigation</span>
                                <span className="text-sm text-neutral-500">Improved keyboard shortcuts and focus indicators</span>
                            </div>
                            <Switch id="enhanced-keyboard-nav" checked={navSetting.enhancedkeyboardnav} onCheckedChange={(e)=>changeNavSettings('enhancedkeyboardnav',e)}/>                            
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Enhanced Focus Indicators</span>
                                <span className="text-sm text-neutral-500">Make focus outlines more visible</span>
                            </div>
                            <Switch id="enhanced-focus-ind" checked={navSetting.enhancedfocusind} onCheckedChange={(e)=>changeNavSettings('enhancedfocusind',e)}/>                            
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Skip Navigation Links</span>
                                <span className="text-sm text-neutral-500">Show links to skip to main content</span>
                            </div>
                            <Switch id="skip-nav-links" checked={navSetting.skipnavlinks} onCheckedChange={(e)=>changeNavSettings('skipnavlinks',e)}/>                            
                        </div>
                    </CardContent>                
                </Card>
                    
                {/* communication settings */}
                <Card className={'w-full h-max max-w-lg'}>
                    <CardHeader className={' h-fit flex flex-col gap-1'}>
                        <span className="w-fit flex items-center gap-2"><MessageCircle size={16}/> Communication Settings</span>
                        <span className="text-sm text-neutral-500">Adjust how you communicate with matches</span>
                        <div className="w-[99%] h-0.5 bg-neutral-200 mt-2"></div>
                    </CardHeader>
                    <CardContent className={'w-full h-fit flex flex-col gap-8'}>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Preferred Message Format</span>
                                <span className="text-sm text-neutral-500">Choose your preferred way to send messages</span>
                            </div>
                            <Select onValueChange={(e)=>{changeCommunicationSettings('messageformat',e)}} value={communicationSetting.messageformat}>
                                <SelectTrigger className={'w-max'}>
                                    <SelectValue placeholder='Text Messages'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Text Messages">Text Messages</SelectItem>
                                        <SelectItem value="Voice Messages">Voice Messages</SelectItem>
                                        <SelectItem value="Video Messages">Video Messages</SelectItem>
                                        <SelectItem value="All Formats">All Formats</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>                        
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Auto Captions</span>
                                <span className="text-sm text-neutral-500">Automatically generate captions for voice/video messages</span>
                            </div>
                            <Switch id="auto-captions" checked={communicationSetting.autocaptions} onCheckedChange={(e)=>{changeCommunicationSettings('autocaptions',e)}}/>                            
                        </div>
                        <div className="w-full h-fit flex justify-between">
                            <div className="flex-1 h-fit flex flex-col">
                                <span>Sign Language Support</span>
                                <span className="text-sm text-neutral-500">Enable sign language interpretation features</span>
                            </div>
                            <Switch id="sign-language-suuport" checked={communicationSetting.signlanguagesupport} onCheckedChange={(e)=>{changeCommunicationSettings('signlanguagesupport',e)}}/>                            
                        </div>
                        
                    </CardContent>                
                </Card>

                <div className="w-full h-20 md:h-32 col-span-2">

                </div>


            
                
            </div>
        </>
    )
}

function SliderInput({className}){
    return(
        <>
            <Slider defaultValue={[50]} max={100} step={25} className={'w-1/2'}/>
            
        </>
    )
}