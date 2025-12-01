---
title: Taking Photos
---

The quality of your Gaussian splat is fundamentally determined by the quality of your source photos. This guide covers essential techniques for capturing images that will produce high-quality, detailed splats.

## Why Photo Quality Matters

Unlike traditional 3D modeling where you can fix issues in post-production, Gaussian splats are trained directly from your source imagery. This means that every problem in your source photos becomes a problem in your final splat.

:::warning Poor Photo Quality Consequences

Bad capture techniques result in:

- **Floaters** - Stray splats in wrong locations
- **Blurry or missing details** - Areas with insufficient coverage  
- **Incorrect lighting** - Inconsistent illumination across the scene
- **Training failures** - Algorithms unable to converge on good solutions

:::

Getting the capture right is your best investment in final quality - it's much easier to shoot it right than to fix it later.

## Camera Equipment

Choosing the right camera equipment depends on your experience level, budget, and the complexity of subjects you plan to capture. Here's a comparison of the main options:

| Camera Type | Best For | Key Advantages | Main Limitations | Recommended Models |
|-------------|----------|----------------|------------------|-------------------|
| 📱 **Smartphone** | Beginners, small objects | Always available, computational photography, easy handling | Fixed aperture, limited zoom, smaller sensors | iPhone 13 Pro+, Google Pixel 7+, Samsung Galaxy S22+ |
| 🎥 **Action Camera** | Intermediate users, limited budgets | Stabilization, wide angle, durability | Small sensors, limited control | DJI Osmo Pocket |
| 📷 **DSLR/Mirrorless** | Professional work, large scenes | Full manual control, larger sensors, interchangeable lenses | More complex, heavier, requires photography knowledge | Any modern DSLR/mirrorless with 20MP+ |

:::tip For Beginners

Start with your smartphone! Modern phones produce excellent results and let you learn the fundamentals without equipment investment. You can always upgrade to a dedicated camera once you understand the process.

:::

### Lens Considerations

The focal length and aperture you choose significantly impact reconstruction quality. For optimal results, stick to **35-85mm equivalent focal length** - this range provides natural perspective without the distortion of ultra-wide lenses or the compressed depth perception of telephoto lenses.

When it comes to aperture, **f/8-f/11** represents the sweet spot where most lenses achieve maximum sharpness across the entire frame. This ensures all parts of your subject are equally detailed for the reconstruction algorithm.

:::caution Avoid These Settings

- **Ultra-wide lenses (&lt;24mm)**: Cause barrel distortion that confuses reconstruction algorithms
- **Telephoto lenses (&gt;135mm)**: Compress depth perception, making 3D reconstruction more difficult  
- **Wide apertures (f/1.4-f/2.8)**: Create shallow depth of field, leaving parts of your subject out of focus
- **Tiny apertures (f/16+)**: Introduce diffraction that softens the entire image

:::

## Camera Settings

Proper camera settings are crucial for consistent, high-quality captures. The key principle is consistency - maintain identical settings across your entire capture session to avoid confusing the reconstruction algorithms.

### File Format and Quality

Always shoot in **RAW format** when possible, as it preserves maximum image data for processing flexibility. If RAW isn't available, use the highest quality JPEG setting your camera offers. Avoid heavily compressed formats that introduce artifacts.

Use your camera's **maximum resolution** - more pixels provide more detail for the reconstruction algorithm to work with. As a minimum, aim for 12MP for small objects and 20MP+ for room-scale scenes.

### ISO and Image Quality

Keep your ISO as low as possible (ISO 100-400) to minimize noise. Clean images with low noise help reconstruction algorithms identify features more accurately.

:::info ISO Guidelines

| Lighting Condition | Recommended ISO | Maximum ISO |
|-------------------|-----------------|-------------|
| Bright daylight | ISO 100-200 | ISO 400 |
| Indoor/Overcast | ISO 200-400 | ISO 800 |
| Low light | ISO 400-800 | ISO 1600 |
| Very low light | ISO 800-1600 | ISO 3200* |

*Only if absolutely necessary - consider adding artificial lighting instead

:::

### Focus Strategy

Manual focus is strongly preferred to ensure consistent sharpness across all images. If you must use autofocus, switch to single-point mode and focus on the same feature consistently throughout your capture session.

### Exposure Consistency

The most critical aspect of camera settings is maintaining **identical exposure** throughout your entire capture session. Use manual mode to lock your aperture, shutter speed, and ISO settings.

:::tip Exposure Lock Technique

If you're not comfortable with manual mode:

1. Use your camera's auto-exposure on the first shot
2. Note the settings it chose
3. Switch to manual and dial in those exact settings
4. Don't change them for the rest of the session

:::

For shutter speed, ensure it's fast enough to prevent motion blur - at minimum **1/125s when handheld**. Use a tripod for longer exposures in low light, and enable image stabilization if your camera or lens has it.

## Photos vs Video

The choice between still photography and video extraction depends on your subject matter and shooting conditions. Each approach has distinct advantages and optimal use cases.

### Still Photography

Still photography offers the highest quality per frame and maximum control over each capture. This approach works best for **static subjects** in **controlled environments** where you can take your time to ensure each shot is perfect.

The advantages of stills include access to higher resolutions (often 40MP+ vs 4K video's 8MP), full manual control over each individual frame, superior low-light performance, and no compression artifacts from video encoding.

:::tip When to Choose Stills

Use still photography for:

- Small objects requiring maximum detail
- Professional work where quality is paramount  
- Studio or controlled lighting situations
- Subjects that can remain stationary during capture

:::

### Video Capture

Video capture excels when dealing with **moving subjects** or when you need to cover large areas quickly. It's particularly useful in challenging environments where setting up individual shots would be difficult or time-consuming.

For video capture, always shoot in **4K resolution minimum** - 1080p doesn't provide sufficient detail for quality splats. Use a high frame rate (60fps+) for smooth motion, and critically important: **lock your exposure settings** to prevent flicker between frames.

:::warning Video Capture Requirements

Essential video settings:

- **4K resolution minimum** (8MP effective)
- **60fps+ frame rate** for motion handling
- **Manual exposure** - no auto-adjustments
- **Maximum bitrate** available
- **Stable color temperature** throughout

:::

When extracting frames from video, take every 2nd-5th frame depending on your movement speed, and always check extracted frames for motion blur before processing - blurry frames will hurt your final reconstruction quality.

:::tip

Consider using tools like [Sharp Frames](https://sharp-frames.reflct.app/) to automatically select the best frames from your video.

:::

## Number of Photos

The number of photos you need varies dramatically based on your subject size and complexity. More photos generally lead to better results, but there are practical guidelines that balance quality with capture time.

| Subject Size | Recommended Photos | Examples | Key Considerations |
|--------------|-------------------|----------|-------------------|
| **Small (&lt;1 foot)** | 50-100 photos | Desktop items, products, collectibles | Higher density needed for fine details |
| **Medium (1-10 feet)** | 100-200 photos | Furniture, statues, vehicles | Multiple elevation levels essential |
| **Large (10+ feet)** | 200-500+ photos | Rooms, buildings, landscapes | Systematic grid approach required |

### Overlap Requirements

Proper overlap between images is critical for successful reconstruction. Think of it like overlapping puzzle pieces - each photo needs to share enough content with its neighbors for the algorithm to understand how they connect.

Aim for **70-80% overlap** between adjacent photos in the same ring or row. When moving between different elevation levels or rings around your subject, maintain **60-70% overlap** to ensure vertical connections.

:::note Angle Guidelines

- **15-30 degrees** between adjacent viewpoints
- **Multiple elevations** for every subject (high, medium, low angles)  
- **360-degree coverage** for objects viewable from all sides
- **When in doubt, shoot more** - extra photos rarely hurt, missing coverage always does

:::

## Scene Coverage Techniques

### Object Photography

**Turntable Method:**

1. Place object on rotating surface
2. Take photos every 15-20 degrees (18-24 photos per ring)
3. Capture 3-4 rings at different heights
4. Include top-down and bottom-up views if possible

**Orbital Method:**

1. Walk around static object in circles
2. Maintain consistent distance
3. Vary height between passes
4. Overlap each orbit by 30-40%

### Room/Scene Photography

**Grid Pattern:**

1. Plan systematic grid across the space
2. Take photos from each grid point
3. Vary heights (standing, crouching, elevated)
4. Include corner and edge details

**Feature-Based Coverage:**

1. Identify key features and surfaces
2. Ensure each feature visible from multiple angles
3. Pay extra attention to transitions and corners
4. Capture ceiling and floor connections

## Lighting Considerations

### Consistent Lighting

**Natural Light:**

- **Overcast days:** Soft, even illumination
- **Avoid direct sunlight:** Creates harsh shadows
- **Golden hour:** Warm but avoid dramatic shadows

**Artificial Light:**

- **Soft, diffused lighting:** Multiple light sources
- **Avoid single hard lights:** Creates strong shadows
- **Color consistency:** Same color temperature throughout

### Challenging Lighting

**Mixed Lighting:**

- Try to maintain consistent color temperature
- Use manual white balance
- Consider HDR techniques for extreme contrast

**Low Light:**

- Use tripod for stability
- Increase ISO carefully
- Consider additional lighting equipment

## Common Mistakes to Avoid

Learning from common pitfalls can save you hours of frustration and failed reconstructions. Here are the most frequent issues that sabotage otherwise good photogrammetry sessions.

:::danger Coverage Problems

**Insufficient overlap**: Gaps in reconstruction where photos don't connect  
**Missing viewpoints**: Blind spots create holes in your final model  
**Single height level**: Results in flat, incomplete geometry  
**Too few photos**: Sparse coverage leads to low-quality, incomplete results

:::

:::warning Technical Issues

**Motion blur**: Even slight camera shake makes images unusable for reconstruction  
**Focus inconsistency**: Some areas sharp while others are soft confuses algorithms  
**Exposure changes**: Brightness variations between shots break feature matching  
**Reflective surfaces**: Mirrors, glass, and chrome can create false features and artifacts

:::

:::caution Environmental Challenges

**Moving objects**: People, vehicles, or wind-blown foliage create ghosting artifacts  
**Changing conditions**: Clouds or shadows shifting during capture session  
**Cluttered backgrounds**: Unnecessary complexity that doesn't add value to your subject

:::

## Quality Control Checklist

Before processing your photogrammetry, invest time in reviewing your captures. This quality control step can save hours of processing time and prevent disappointing results.

:::tip Pre-Processing Checklist

✅ **Review all images** for sharpness and exposure consistency  
✅ **Check coverage** - ensure no major blind spots in your subject  
✅ **Verify overlap** - sufficient redundancy between adjacent photos  
✅ **Confirm consistency** - lighting and camera settings remained stable  
✅ **Remove bad shots** - delete blurry, over/underexposed, or redundant images

:::

Remember: good photogrammetry is the foundation of excellent Gaussian splats. While it may seem time-consuming initially, developing systematic capture habits will dramatically improve your results and reduce the time spent troubleshooting failed reconstructions.

Take time to plan your capture strategy before you start shooting, and execute it methodically. The extra effort invested in proper photogrammetry pays dividends in the quality of your final splats.
