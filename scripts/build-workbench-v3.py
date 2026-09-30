"""Compose website-generated Nano Banana Pro sprites without deforming body parts."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops, ImageFilter
import numpy as np, json, math
from collections import deque
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/media/workbench/v3';SRC=ROOT/'assets/workbench-v3';N=Image.Resampling.NEAREST
SIZE=(192,176)
def blank():return Image.new('RGBA',SIZE)
def dehalo(im):
 a=np.array(im)
 # Generated sources have a white matte. Only clean neutral bright EDGE pixels;
 # skin, wood and highlights enclosed by the opaque silhouette stay intact.
 for _ in range(2):
  alpha=Image.fromarray(a[:,:,3]);edge=(a[:,:,3]>0)&(np.array(alpha.filter(ImageFilter.MinFilter(3)))==0)
  rgb=a[:,:,:3].astype(int);matte=(rgb.min(axis=2)>108)&(np.ptp(rgb,axis=2)<65)
  a[edge&matte,3]=0
 a[a[:,:,3]==0,:3]=0
 return Image.fromarray(a)
def cells(name,cols=4,rows=2):
 im=Image.open(SRC/(name+'.png')).convert('RGBA');a=np.array(im);a[:,:,3]=np.where((a[:,:,:3].min(axis=2)>180)&(np.ptp(a[:,:,:3].astype(int),axis=2)<45),0,255);im=Image.fromarray(a)
 result=[]
 for j in range(rows):
  for i in range(cols):
   c=im.crop((i*im.width//cols,j*im.height//rows,(i+1)*im.width//cols,(j+1)*im.height//rows));result.append(c.crop(c.getbbox()))
 return result
metrics=[]
def person(im,feet=148,cx=117,fixed=None):
 a=np.array(im);r,g,b=[a[:,:,i].astype(float) for i in range(3)]
 mask=(a[:,:,3]>0)&(r>165)&(g>100)&(g<225)&(b<180)&(r>g*1.12)&(g>b*1.1)
 mask[round(im.height*.55):]=False
 density=mask.sum(axis=1);ys=np.where(density>max(4,density.max()*.25))[0];top,bottom=ys.min(),ys.max()+1
 yy,xx=np.where(mask & (np.indices(mask.shape)[0]>=top)&(np.indices(mask.shape)[0]<bottom));fc=(xx.min()+xx.max())/2
 factor=fixed or 27/(bottom-top)
 # Lighten skin only inside the face; never recolor gloves or sweater.
 face=mask.copy();face[:top]=False;face[bottom:]=False
 for k,amount in enumerate((8,17,22)):a[:,:,k]=np.where(face,np.minimum(255,a[:,:,k].astype(int)+amount),a[:,:,k])
 scaled=Image.fromarray(a).resize((round(im.width*factor),round(im.height*factor)),N)
 x=round(cx-fc*factor);y=feet-scaled.height
 result=blank();result.alpha_composite(scaled,(x,y))
 # Remove isolated resampling specks from neighboring sheet cells.
 rgba=np.array(result);seen=rgba[:,:,3]>0
 for sy,sx in zip(*np.where(seen.copy())):
  if not seen[sy,sx]:continue
  queue=deque([(sy,sx)]);seen[sy,sx]=False;part=[]
  while queue:
   py,px=queue.popleft();part.append((py,px))
   for dy,dx in [(0,1),(0,-1),(1,0),(-1,0)]:
    ny,nx=py+dy,px+dx
    if 0<=ny<SIZE[1] and 0<=nx<192 and seen[ny,nx]:seen[ny,nx]=False;queue.append((ny,nx))
  if len(part)<4:
   for py,px in part:rgba[py,px,3]=0
 result=dehalo(Image.fromarray(rgba));metrics.append(dict(scale=round(factor,5),bounds=[x,y,*scaled.size],faceHeight=round((bottom-top)*factor,2)));return result
f=cells('furniture',2,2)
def furniture(im,width,x,y):
 c=im.resize((width,round(im.height*width/im.width)),N);result=blank();result.alpha_composite(c,(x,y));return dehalo(result)
# One table is used for every state, including the empty scene.
table=furniture(f[0],86,25,81)
board=furniture(f[0],98,29,70).crop((51,85,73,97)).resize((12,7),N);table.alpha_composite(board,(90,104))
# Restore tabletop material under small holes in generated metal tool handles.
alpha=np.array(table.getchannel('A'))>0;outside=np.zeros(alpha.shape,bool);q=deque([(0,0)]);outside[0,0]=True
while q:
 py,px=q.popleft()
 for dy,dx in [(0,1),(0,-1),(1,0),(-1,0)]:
  ny,nx=py+dy,px+dx
  if 0<=ny<SIZE[1] and 0<=nx<192 and not alpha[ny,nx] and not outside[ny,nx]:outside[ny,nx]=True;q.append((ny,nx))
rgba=np.array(table);holes=(~alpha)&(~outside)&(np.indices(alpha.shape)[0]<125);rgba[holes]=[159,85,15,255];table=Image.fromarray(rgba)
chair=furniture(f[2],47,109,76)
# The iron and stand are an additive isolated object, not a replacement table.
iron=f[1].crop((0,0,f[1].width,round(f[1].height*.35)))
a=np.array(iron);r,g,b=[a[:,:,i].astype(int) for i in range(3)];a[:,:,3]=np.where((a[:,:,3]>0)&((np.maximum.reduce([r,g,b])-np.minimum.reduce([r,g,b]))<35),a[:,:,3],0)
iron=Image.fromarray(a);iron=iron.crop(iron.getbbox()).rotate(65,expand=True,resample=N);iron=furniture(iron,20,65,100)
table_after=table.copy();table_after.alpha_composite(iron)
# Center the work surface in front of the seated actor; move tools with the table.
TABLE_OFFSET=(32,11)
def place_table(layer):
 out=blank();out.alpha_composite(layer,TABLE_OFFSET);return out
table=place_table(table);table_after=place_table(table_after)
chairposes=[chair]*8
if (SRC/'chair.png').exists():
 chaircells=cells('chair',4,3)
 # The seat must face the table (screen lower-left), with its back on the right.
 # Cells 0-5 face ninety degrees too far counterclockwise.
 chairposes=[furniture(chaircells[i],47,109,76) for i in [6,6,6,6,7,7,7,7]]
chair=chairposes[0]
def movedchair(i):
 out=blank();out.alpha_composite(chairposes[i],(round(20*i/7),-round(3*i/7)));return out
rest=movedchair(7)
def scene(actor=None,chairphase=0,dropped=False,hands=False):
 out=blank();out.alpha_composite(movedchair(chairphase));
 if actor:out.alpha_composite(actor)
 out.alpha_composite(table_after if dropped else table)
 if actor and not hands:
  a=np.array(actor);rgb=a[:,:,:3].astype(int);grey=(np.ptp(rgb,axis=2)<27)&(rgb.max(axis=2)<150)&(rgb.max(axis=2)>45)
  mask=Image.new('L',SIZE);ImageDraw.Draw(mask).polygon([(62,90),(102,77),(157,102),(132,119)],fill=255)
  a[:,:,3]=np.where(grey&(np.array(mask)>0)&(np.indices(grey.shape)[0]>90),a[:,:,3],0);out.alpha_composite(Image.fromarray(a))
 if hands and actor:
  # Restore only the glove/tool region above the tabletop, not torso or table edge.
  hand=actor.copy();mask=Image.new('L',SIZE);draw=ImageDraw.Draw(mask)
  draw.polygon([(83,84),(100,89),(110,94),(109,104),(102,110),(83,114)],fill=255)
  draw.polygon([(137,86),(145,98),(145,113),(136,118),(121,122),(112,117),(114,110),(129,107),(130,96)],fill=255)
  hand.putalpha(ImageChops.multiply(hand.getchannel('A'),mask));out.alpha_composite(hand)
 return out
idle_src=cells('idle');base=person(idle_src[0]);idle=[]
# Stabilize everything except the soldering hand. The sampled cycle returns to frame zero.
for i in range(56):
 p=base.copy(); hand=base.crop((66,77,103,110));p.paste((0,0,0,0),(66,77,103,110));p.alpha_composite(hand,(66+round(math.sin(i*math.tau/56)),77+round(.6*math.sin(i*math.tau/28))));idle.append(scene(p,hands=True))
look=[person(c,fixed=.106) for c in cells('look')]
rise=[person(c) for c in cells('rise')]
turn=[person(c,fixed=.111) for c in cells('turn')]
# Discard two generated pivot poses with inconsistent torso proportions.
turn=[turn[i] for i in [0,1,2,3,6,7]]
walk_cells=cells('walk-side')
# All steps now use the isolated right-facing standing reference.
walk=[person(walk_cells[i],fixed=108/walk_cells[i].height) for i in range(8)]
# Keep only seated looking poses; the generated early standing poses are excluded.
actors=[base]+[person(c) for c in cells('reaction',4,4)[2:4]]+[look[i] for i in [0,1,2,4,5,3]]+rise+turn
reaction=[]
for i,p in enumerate(actors):
 cp=min(7,max(0,i-9));reaction.append(scene(p,cp,i>=2,i<3))
def atlas(name,frames):
 im=Image.new('RGBA',(192*8,SIZE[1]*math.ceil(len(frames)/8)))
 path=OUT/'frames'/name;path.mkdir(parents=True,exist_ok=True)
 for i,f in enumerate(frames):im.alpha_composite(f,(i%8*192,i//8*SIZE[1]));f.save(path/f'{i:03}.png')
 im.save(OUT/(name+'.png'))
for name,frames in [('idle',idle),('reaction',reaction),('walk',walk)]:atlas(name,frames)
for name,im in [('table',table_after),('chair-rest',rest),('empty',scene(None,7,True)),('hit',base)]:im.save(OUT/(name+'.png'))
# A foreground table must never itself become an easter-egg target.
hit=base.copy();a=np.array(hit);a[:,:,3]=np.where(np.array(table.getchannel('A'))>0,0,a[:,:,3]);Image.fromarray(a).save(OUT/'hit.png')
manifest={'frameSize':list(SIZE),'idle':56,'reaction':len(reaction),'walk':len(walk),'chair':8,'source':'Nano Banana Pro 2K via Higgsfield website Unlimited','metrics':metrics}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
preview=Image.new('RGB',(192*6*2,185*math.ceil(len(reaction)/6)*2),'#222633');d=ImageDraw.Draw(preview)
for i,f in enumerate(reaction):x=i%6*384;y=i//6*370;preview.paste(f.resize((384,352),N),(x,y),f.resize((384,352),N));d.text((x+8,y+354),str(i),fill='white')
preview.save(OUT/'contact-reaction.png')
idle[0].resize((768,704),N).save(OUT/'preview-idle.png')
print(manifest | {'metrics':'see manifest'})
