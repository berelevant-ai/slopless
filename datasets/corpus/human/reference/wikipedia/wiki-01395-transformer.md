# Transformer

A transformer is an electrical device that transfers electrical energy between two or more circuits through electromagnetic induction. Electromagnetic induction produces an electromotive force within a conductor which is exposed to time varying magnetic fields. Transformers are used to increase or decrease the alternating voltages in electric power applications.
A varying current in the transformer's primary winding creates a varying magnetic flux in the transformer core and a varying field impinging on the transformer's secondary winding. This varying magnetic field at the secondary winding induces a varying electromotive force (EMF) or voltage in the secondary winding due to electromagnetic induction. Making use of Faraday's Law (discovered in 1831) in conjunction with high magnetic permeability core properties, transformers can be designed to efficiently change AC voltages from one voltage level to another within power networks.
Since the invention of the first constant potential transformer in 1885, transformers have become essential for the transmission, distribution, and utilization of alternating current electrical energy. A wide range of transformer designs is encountered in electronic and electric power applications. Transformers range in size from RF transformers less than a cubic centimeter in volume to units interconnecting the power grid weighing hundreds of tons.

## Basic principles


### Ideal transformer

For simplification or approximation purposes, it is very common to analyze the transformer as an ideal transformer model as presented in the two images. An ideal transformer is a theoretical, linear transformer that is lossless and perfectly coupled; that is, there are no energy losses and flux is completely confined within the magnetic core. Perfect coupling implies infinitely high core magnetic permeability and winding inductances and zero net magnetomotive force.
A varying current in the transformer's primary winding creates a varying magnetic flux in the core and a varying magnetic field impinging on the secondary winding. This varying magnetic field at the secondary induces a varying electromotive force (EMF) or voltage in the secondary winding. The primary and secondary windings are wrapped around a core of infinitely high magnetic permeability so that all of the magnetic flux passes through both the primary and secondary windings. With a voltage source connected to the primary winding and load impedance connected to the secondary winding, the transformer currents flow in the indicated directions. (See also Polarity.)
According to Faraday's Law, since the same magnetic flux passes through both the primary and secondary windings in an ideal transformer, a voltage is induced in each winding, according to eq. (1) in the secondary winding case, according to eq. (2) in the primary winding case. The primary EMF is sometimes termed counter EMF. This is in accordance with Lenz's law, which states that induction of EMF always opposes development of any such change in magnetic field.
The transformer winding voltage ratio is thus shown to be directly proportional to the winding turns ratio according to eq. (3).
According to the law of conservation of energy, any load impedance connected to the ideal transformer's secondary winding results in conservation of apparent, real and reactive power consistent with eq. (4).
The ideal transformer identity shown in eq. (5) is a reasonable approximation for the typical commercial transformer, with voltage ratio and winding turns ratio both being inversely proportional to the corresponding current ratio.
By Ohm's law and the ideal transformer identity:
the secondary circuit load impedance can be expressed as eq. (6)
the apparent load impedance referred to the primary circuit is derived in eq. (7) to be equal to the turns ratio squared times the secondary circuit load impedance.

#### Polarity

A dot convention is often used in transformer circuit diagrams, nameplates or terminal markings to define the relative polarity of transformer windings. Positively increasing instantaneous current entering the primary winding's dot end induces positive polarity voltage at the secondary winding's dot end.

### Real transformer


#### Deviations from ideal

The ideal transformer model neglects the following basic linear aspects in real transformers.
Core losses, collectively called magnetizing current losses, consist of
Hysteresis losses due to nonlinear application of the voltage applied in the transformer core, and
Eddy current losses due to joule heating in the core that are proportional to the square of the transformer's applied voltage.
Whereas windings in the ideal model have no resistances and infinite inductances, the windings in a real transformer have finite non-zero resistances and inductances associated with:
Joule losses due to resistance in the primary and secondary windings
Leakage flux that escapes from the core and passes through one winding only resulting in primary and secondary reactive impedance.

#### Leakage flux

The ideal transformer model assumes that all flux generated by the primary winding links all the turns of every winding, including itself. In practice, some flux traverses paths that take it outside the windings. Such flux is termed leakage flux, and results in leakage inductance in series with the mutually coupled transformer windings. Leakage flux results in energy being alternately stored in and discharged from the magnetic fields with each cycle of the power supply. It is not directly a power loss, but results in inferior voltage regulation, causing the secondary voltage not to be directly proportional to the primary voltage, particularly under heavy load. Transformers are therefore normally designed to have very low leakage inductance.
In some applications increased leakage is desired, and long magnetic paths, air gaps, or magnetic bypass shunts may deliberately be introduced in a transformer design to limit the short-circuit current it will supply. Leaky transformers may be used to supply loads that exhibit negative resistance, such as electric arcs, mercury vapor lamps, and neon signs or for safely handling loads that become periodically short-circuited such as electric arc welders.
Air gaps are also used to keep a transformer from saturating, especially audio-frequency transformers in circuits that have a DC component flowing in the windings.
Knowledge of leakage inductance is also useful when transformers are operated in parallel. It can be shown that if the percent impedance and associated winding leakage reactance-to-resistance (X / R) ratio of two transformers were hypothetically exactly the same, the transformers would share power in proportion to their respective volt-ampere ratings (e.g. 500 kVA unit in parallel with 1,000 kVA unit, the larger unit would carry twice the current). However, the impedance tolerances of commercial transformers are significant. Also, the Z impedance and X / R ratio of different capacity transformers tends to vary, corresponding 1,000 kVA and 500 kVA units ' values being, to illustrate, respectively, Z ≈ 5.75%, X / R ≈ 3.75 and Z ≈ 5%, X / R ≈ 4.75.

#### Equivalent circuit

Referring to the diagram, a practical transformer's physical behavior may be represented by an equivalent circuit model, which can incorporate an ideal transformer.
Winding joule losses and leakage reactances are represented by the following series loop impedances of the model:
Primary winding: RP, XP
Secondary winding: RS, XS.
In normal course of circuit equivalence transformation, RS and XS are in practice usually referred to the primary side by multiplying these impedances by the turns ratio squared, (NP / NS) 2 = a2.
Core loss and reactance is represented by the following shunt leg impedances of the model:
Core or iron losses: RC
Magnetizing reactance: XM.
RC and XM are collectively termed the magnetizing branch of the model.
Core losses are caused mostly by hysteresis and eddy current effects in the core and are proportional to the square of the core flux for operation at a given frequency. The finite permeability core requires a magnetizing current IM to maintain mutual flux in the core. Magnetizing current is in phase with the flux, the relationship between the two being non-linear due to saturation effects. However, all impedances of the equivalent circuit shown are by definition linear and such non-linearity effects are not typically reflected in transformer equivalent circuits. With sinusoidal supply, core flux lags the induced EMF by 90 °. With open-circuited secondary winding, magnetizing branch current I0 equals transformer no-load current.
The resulting model, though sometimes termed ' exact ' equivalent circuit based on linearity assumptions, retains a number of approximations. Analysis may be simplified by assuming that magnetizing branch impedance is relatively high and relocating the branch to the left of the primary impedances. This introduces error but allows combination of primary and referred secondary resistances and reactances by simple summation as two series impedances.
Transformer equivalent circuit impedance and transformer ratio parameters can be derived from the following tests: open-circuit test, short-circuit test, winding resistance test, and transformer ratio test.

## Basic transformer parameters and construction


### Effect of frequency

By Faraday's Law of induction shown in eq. (1) and (2), transformer EMFs vary according to the derivative of flux with respect to time. The ideal transformer's core behaves linearly with time for any non-zero frequency. Flux in a real transformer's core behaves non-linearly in relation to magnetization current as the instantaneous flux increases beyond a finite linear range resulting in magnetic saturation associated with increasingly large magnetizing current, which eventually leads to transformer overheating.
The EMF of a transformer at a given flux density increases with frequency. By operating at higher frequencies, transformers can be physically more compact because a given core is able to transfer more power without reaching saturation and fewer turns are needed to achieve the same impedance. However, properties such as core loss and conductor skin effect also increase with frequency. Aircraft and military equipment employ 400 Hz power supplies which reduce core and winding weight. Conversely, frequencies used for some railway electrification systems were much lower (e.g. 16.7 Hz and 25 Hz) than normal utility frequencies (50 – 60 Hz) for historical reasons concerned mainly with the limitations of early electric traction motors. Consequently, the transformers used to step-down the high overhead line voltages (e.g. 15 kV) were much larger and heavier for the same power rating than those required for the higher frequencies.
Operation of a transformer at its designed voltage but at a higher frequency than intended will lead to reduced magnetizing current. At a lower frequency, the magnetizing current will increase. Operation of a transformer at other than its design frequency may require assessment of voltages, losses, and cooling to establish if safe operation is practical. For example, transformers may need to be equipped with ' volts per hertz ' over-excitation relays to protect the transformer from overvoltage at higher than rated frequency.
One example is in traction transformers used for electric multiple unit and high-speed train service operating across regions with different electrical standards. The converter equipment and traction transformers have to accommodate different input frequencies and voltage (ranging from as high as 50 Hz down to 16.7 Hz and rated up to 25 kV) while being suitable for multiple AC asynchronous motor and DC converters and motors with varying harmonics mitigation filtering requirements.
Large power transformers are vulnerable to insulation failure due to transient voltages with high-frequency components, such as caused in switching or by lightning.
At much higher frequencies the transformer core size required drops dramatically: a physically small and cheap transformer can handle power levels that would require a massive iron core at mains frequency. The development of switching power semiconductor devices and complex integrated circuits made switch-mode power supplies viable, to generate a high frequency from a much lower one (or DC), change the voltage level with a small transformer, and, if necessary, rectify the changed voltage.

### Energy losses

Real transformer energy losses are dominated by winding resistance joule and core losses. Transformers ' efficiency tends to improve with increasing transformer capacity. The efficiency of typical distribution transformers is between about 98 and 99 percent.
As transformer losses vary with load, it is often useful to express these losses in terms of no-load loss, full-load loss, half-load loss, and so on. Hysteresis and eddy current losses are constant at all load levels and dominate overwhelmingly without load, while variable winding joule losses dominating increasingly as load increases. The no-load loss can be significant, so that even an idle transformer constitutes a drain on the electrical supply. Designing energy efficient transformers for lower loss requires a larger core, good-quality silicon steel, or even amorphous steel for the core and thicker wire, increasing initial cost. The choice of construction represents a trade-off between initial cost and operating cost.
Transformer losses arise from:
Winding joule losses
Current flowing through a winding's conductor causes joule heating. As frequency increases, skin effect and proximity effect causes the winding's resistance and, hence, losses to increase.
Core losses
Hysteresis losses
Each time the magnetic field is reversed, a small amount of energy is lost due to hysteresis within the core. According to Steinmetz's formula, the heat energy due to hysteresis is given by
<formula>, and,
hysteresis loss is thus given by
<formula>
where, f is the frequency, η is the hysteresis coefficient and βmax is the maximum flux density, the empirical exponent of which varies from about 1.4 to 1.8 but is often given as 1.6 for iron.
Eddy current losses
Ferromagnetic materials are also good conductors and a core made from such a material also constitutes a single short-circuited turn throughout its entire length. Eddy currents therefore circulate within the core in a plane normal to the flux, and are responsible for resistive heating of the core material. The eddy current loss is a complex function of the square of supply frequency and inverse square of the material thickness. Eddy current losses can be reduced by making the core of a stack of plates electrically insulated from each other, rather than a solid block; all transformers operating at low frequencies use laminated or similar cores.
Magnetostriction related transformer hum
Magnetic flux in a ferromagnetic material, such as the core, causes it to physically expand and contract slightly with each cycle of the magnetic field, an effect known as magnetostriction, the frictional energy of which produces an audible noise known as mains hum or transformer hum. This transformer hum is especially objectionable in transformers supplied at power frequencies and in high-frequency flyback transformers associated with television CRTs.
Stray losses
Leakage inductance is by itself largely lossless, since energy supplied to its magnetic fields is returned to the supply with the next half-cycle. However, any leakage flux that intercepts nearby conductive materials such as the transformer's support structure will give rise to eddy currents and be converted to heat. There are also radiative losses due to the oscillating magnetic field but these are usually small.
Mechanical vibration and audible noise transmission
In addition to magnetostriction, the alternating magnetic field causes fluctuating forces between the primary and secondary windings. This energy incites vibration transmission in interconnected metalwork, thus amplifying audible transformer hum.

### Core form and shell form transformers

Closed-core transformers are constructed in ' core form ' or ' shell form '. When windings surround the core, the transformer is core form; when windings are surrounded by the core, the transformer is shell form. Shell form design may be more prevalent than core form design for distribution transformer applications due to the relative ease in stacking the core around winding coils. Core form design tends to, as a general rule, be more economical, and therefore more prevalent, than shell form design for high voltage power transformer applications at the lower end of their voltage and power rating ranges (less than or equal to, nominally, 230 kV or 75 MVA). At higher voltage and power ratings, shell form transformers tend to be more prevalent. Shell form design tends to be preferred for extra-high voltage and higher MVA applications because, though more labor-intensive to manufacture, shell form transformers are characterized as having inherently better kVA-to-weight ratio, better short-circuit strength characteristics and higher immunity to transit damage.

## Construction


### Cores


#### Laminated steel cores

Transformers for use at power or audio frequencies typically have cores made of high permeability silicon steel. The steel has a permeability many times that of free space and the core thus serves to greatly reduce the magnetizing current and confine the flux to a path which closely couples the windings. Early transformer developers soon realized that cores constructed from solid iron resulted in prohibitive eddy current losses, and their designs mitigated this effect with cores consisting of bundles of insulated iron wires. Later designs constructed the core by stacking layers of thin steel laminations, a principle that has remained in use. Each lamination is insulated from its neighbors by a thin non-conducting layer of insulation. The universal transformer equation indicates a minimum cross-sectional area for the core to avoid saturation.
The effect of laminations is to confine eddy currents to highly elliptical paths that enclose little flux, and so reduce their magnitude. Thinner laminations reduce losses, but are more laborious and expensive to construct. Thin laminations are generally used on high-frequency transformers, with some of very thin steel laminations able to operate up to 10 kHz.
One common design of laminated core is made from interleaved stacks of E-shaped steel sheets capped with I-shaped pieces, leading to its name of ' E-I transformer '. Such a design tends to exhibit more losses, but is very economical to manufacture. The cut-core or C-core type is made by winding a steel strip around a rectangular form and then bonding the layers together. It is then cut in two, forming two C shapes, and the core assembled by binding the two C halves together with a steel strap. They have the advantage that the flux is always oriented parallel to the metal grains, reducing reluctance.
A steel core's remanence means that it retains a static magnetic field when power is removed. When power is then reapplied, the residual field will cause a high inrush current until the effect of the remaining magnetism is reduced, usually after a few cycles of the applied AC waveform. Overcurrent protection devices such as fuses must be selected to allow this harmless inrush to pass. On transformers connected to long, overhead power transmission lines, induced currents due to geomagnetic disturbances during solar storms can cause saturation of the core and operation of transformer protection devices.
Distribution transformers can achieve low no-load losses by using cores made with low-loss high-permeability silicon steel or amorphous (non-crystalline) metal alloy. The higher initial cost of the core material is offset over the life of the transformer by its lower losses at light load.

#### Solid cores

Powdered iron cores are used in circuits such as switch-mode power supplies that operate above mains frequencies and up to a few tens of kilohertz. These materials combine high magnetic permeability with high bulk electrical resistivity. For frequencies extending beyond the VHF band, cores made from non-conductive magnetic ceramic materials called ferrites are common. Some radio-frequency transformers also have movable cores (sometimes called ' slugs ') which allow adjustment of the coupling coefficient (and bandwidth) of tuned radio-frequency circuits.

#### Toroidal cores

Toroidal transformers are built around a ring-shaped core, which, depending on operating frequency, is made from a long strip of silicon steel or permalloy wound into a coil, powdered iron, or ferrite. A strip construction ensures that the grain boundaries are optimally aligned, improving the transformer's efficiency by reducing the core's reluctance. The closed ring shape eliminates air gaps inherent in the construction of an E-I core. The cross-section of the ring is usually square or rectangular, but more expensive cores with circular cross-sections are also available. The primary and secondary coils are often wound concentrically to cover the entire surface of the core. This minimizes the length of wire needed and provides screening to minimize the core's magnetic field from generating electromagnetic interference.
Toroidal transformers are more efficient than the cheaper laminated E-I types for a similar power level. Other advantages compared to E-I types, include smaller size (about half), lower weight (about half), less mechanical hum (making them superior in audio amplifiers), lower exterior magnetic field (about one tenth), low off-load losses (making them more efficient in standby circuits), single-bolt mounting, and greater choice of shapes. The main disadvantages are higher cost and limited power capacity (see Classification parameters below). Because of the lack of a residual gap in the magnetic path, toroidal transformers also tend to exhibit higher inrush current, compared to laminated E-I types.
Ferrite toroidal cores are used at higher frequencies, typically between a few tens of kilohertz to hundreds of megahertz, to reduce losses, physical size, and weight of inductive components. A drawback of toroidal transformer construction is the higher labor cost of winding. This is because it is necessary to pass the entire length of a coil winding through the core aperture each time a single turn is added to the coil. As a consequence, toroidal transformers rated more than a few kVA are uncommon. Small distribution transformers may achieve some of the benefits of a toroidal core by splitting it and forcing it open, then inserting a bobbin containing primary and secondary windings.

#### Air cores

A physical core is not an absolute requisite and a functioning transformer can be produced simply by placing the windings near each other, an arrangement termed an ' air-core ' transformer. The air which comprises the magnetic circuit is essentially lossless, and so an air-core transformer eliminates loss due to hysteresis in the core material. The leakage inductance is inevitably high, resulting in very poor regulation, and so such designs are unsuitable for use in power distribution. They have however very high bandwidth, and are frequently employed in radio-frequency applications, for which a satisfactory coupling coefficient is maintained by carefully overlapping the primary and secondary windings. They're also used for resonant transformers such as Tesla coils where they can achieve reasonably low loss in spite of the high leakage inductance.

### Windings

The conducting material used for the windings depends upon the application, but in all cases the individual turns must be electrically insulated from each other to ensure that the current travels throughout every turn. For small power and signal transformers, in which currents are low and the potential difference between adjacent turns is small, the coils are often wound from enamelled magnet wire, such as Formvar wire. Larger power transformers operating at high voltages may be wound with copper rectangular strip conductors insulated by oil-impregnated paper and blocks of pressboard.
High-frequency transformers operating in the tens to hundreds of kilohertz often have windings made of braided Litz wire to minimize the skin-effect and proximity effect losses. Large power transformers use multiple-stranded conductors as well, since even at low power frequencies non-uniform distribution of current would otherwise exist in high-current windings. Each strand is individually insulated, and the strands are arranged so that at certain points in the winding, or throughout the whole winding, each portion occupies different relative positions in the complete conductor. The transposition equalizes the current flowing in each strand of the conductor, and reduces eddy current losses in the winding itself. The stranded conductor is also more flexible than a solid conductor of similar size, aiding manufacture.
The windings of signal transformers minimize leakage inductance and stray capacitance to improve high-frequency response. Coils are split into sections, and those sections interleaved between the sections of the other winding.
Power-frequency transformers may have taps at intermediate points on the winding, usually on the higher voltage winding side, for voltage adjustment. Taps may be manually reconnected, or a manual or automatic switch may be provided for changing taps. Automatic on-load tap changers are used in electric power transmission or distribution, on equipment such as arc furnace transformers, or for automatic voltage regulators for sensitive loads. Audio-frequency transformers, used for the distribution of audio to public address loudspeakers, have taps to allow adjustment of impedance to each speaker. A center-tapped transformer is often used in the output stage of an audio power amplifier in a push-pull circuit. Modulation transformers in AM transmitters are very similar.
Dry-type transformer winding insulation systems can be either of standard open-wound ' dip-and-bake ' construction or of higher quality designs that include vacuum pressure impregnation (VPI), vacuum pressure encapsulation (VPE), and cast coil encapsulation processes. In the VPI process, a combination of heat, vacuum and pressure is used to thoroughly seal, bind, and eliminate entrained air voids in the winding polyester resin insulation coat layer, thus increasing resistance to corona. VPE windings are similar to VPI windings but provide more protection against environmental effects, such as from water, dirt or corrosive ambients, by multiple dips including typically in terms of final epoxy coat.

### Cooling

To place the cooling problem in perspective, the accepted rule of thumb is that the life expectancy of insulation in all electrics, including all transformers, is halved for about every 7 ° C to 10 ° C increase in operating temperature, this life expectancy halving rule holding more narrowly when the increase is between about 7 ° C to 8 ° C in the case of transformer winding cellulose insulation.
Small dry-type and liquid-immersed transformers are often self-cooled by natural convection and radiation heat dissipation. As power ratings increase, transformers are often cooled by forced-air cooling, forced-oil cooling, water-cooling, or combinations of these. Large transformers are filled with transformer oil that both cools and insulates the windings. Transformer oil is a highly refined mineral oil that cools the windings and insulation by circulating within the transformer tank. The mineral oil and paper insulation system has been extensively studied and used for more than 100 years. It is estimated that 50% of power transformers will survive 50 years of use, that the average age of failure of power transformers is about 10 to 15 years, and that about 30% of power transformer failures are due to insulation and overloading failures. Prolonged operation at elevated temperature degrades insulating properties of winding insulation and dielectric coolant, which not only shortens transformer life but can ultimately lead to catastrophic transformer failure. With a great body of empirical study as a guide, transformer oil testing including dissolved gas analysis provides valuable maintenance information. This underlines the need to monitor, model, forecast and manage oil and winding conductor insulation temperature conditions under varying, possibly difficult, power loading conditions.
Building regulations in many jurisdictions require indoor liquid-filled transformers to either use dielectric fluids that are less flammable than oil, or be installed in fire-resistant rooms. Air-cooled dry transformers can be more economical where they eliminate the cost of a fire-resistant transformer room.
The tank of liquid filled transformers often has radiators through which the liquid coolant circulates by natural convection or fins. Some large transformers employ electric fans for forced-air cooling, pumps for forced-liquid cooling, or have heat exchangers for water-cooling. An oil-immersed transformer may be equipped with a Buchholz relay, which, depending on severity of gas accumulation due to internal arcing, is used to either alarm or de-energize the transformer. Oil-immersed transformer installations usually include fire protection measures such as walls, oil containment, and fire-suppression sprinkler systems.
Polychlorinated biphenyls have properties that once favored their use as a dielectric coolant, though concerns over their environmental persistence led to a widespread ban on their use. Today, non-toxic, stable silicone-based oils, or fluorinated hydrocarbons may be used where the expense of a fire-resistant liquid offsets additional building cost for a transformer vault. PCBs for new equipment were banned in 1981 and in 2000 for use in existing equipment in United Kingdom Legislation enacted in Canada between 1977 and 1985 essentially bans PCB use in transformers manufactured in or imported into the country after 1980, the maximum allowable level of PCB contamination in existing mineral oil transformers being 50 ppm.
Some transformers, instead of being liquid-filled, have their windings enclosed in sealed, pressurized tanks and cooled by nitrogen or sulfur hexafluoride gas.
Experimental power transformers in the 500 ‐ to ‐ 1,000 kVA range have been built with liquid nitrogen or helium cooled superconducting windings, which eliminates winding losses without affecting core losses.

### Insulation drying

Construction of oil-filled transformers requires that the insulation covering the windings be thoroughly dried of residual moisture before the oil is introduced. Drying is carried out at the factory, and may also be required as a field service. Drying may be done by circulating hot air around the core, or by vapor-phase drying (VPD) where an evaporated solvent transfers heat by condensation on the coil and core.
For small transformers, resistance heating by injection of current into the windings is used. The heating can be controlled very well, and it is energy efficient. The method is called low-frequency heating (LFH) since the current used is at a much lower frequency than that of the power grid, which is normally 50 or 60 Hz. A lower frequency reduces the effect of inductance, so the voltage required can be reduced. The LFH drying method is also used for service of older transformers.

### Bushings

Larger transformers are provided with high-voltage insulated bushings made of polymers or porcelain. A large bushing can be a complex structure since it must provide careful control of the electric field gradient without letting the transformer leak oil.

## Classification parameters

Transformers can be classified in many ways, such as the following:
Power capacity: From a fraction of a volt-ampere (VA) to over a thousand MVA.
Duty of a transformer: Continuous, short-time, intermittent, periodic, varying.
Frequency range: Power-frequency, audio-frequency, or radio-frequency.
Voltage class: From a few volts to hundreds of kilovolts.
Cooling type: Dry and liquid-immersed – self-cooled, forced air-cooled; liquid-immersed – forced oil-cooled, water-cooled.
Circuit application: Such as power supply, impedance matching, output voltage and current stabilizer or circuit isolation.
Utilization: Pulse, power, distribution, rectifier, arc furnace, amplifier output, etc..
Basic magnetic form: Core form, shell form.
Constant-potential transformer descriptor: Step-up, step-down, isolation.
General winding configuration: By EIC vector group – various possible two-winding combinations of the phase designations delta, wye or star, and zigzag or interconnected star; other – autotransformer, Scott-T, zigzag grounding transformer winding.
Rectifier phase-shift winding configuration: 2-winding, 6-pulse; 3-winding, 12-pulse;... n-winding, [ n-1 ] * 6-pulse; polygon; etc..

## Types

Various specific electrical application designs require a variety of transformer types. Although they all share the basic characteristic transformer principles, they are customize in construction or electrical properties for certain installation requirements or circuit conditions.
Autotransformer: Transformer in which part of the winding is common to both primary and secondary circuits.
Capacitor voltage transformer: Transformer in which capacitor divider is used to reduce high voltage before application to the primary winding.
Distribution transformer, power transformer: International standards make a distinction in terms of distribution transformers being used to distribute energy from transmission lines and networks for local consumption and power transformers being used to transfer electric energy between the generator and distribution primary circuits.
Phase angle regulating transformer: A specialised transformer used to control the flow of real power on three-phase electricity transmission networks.
Scott-T transformer: Transformer used for phase transformation from three-phase to two-phase and vice versa.
Polyphase transformer: Any transformer with more than one phase.
Grounding transformer: Transformer used for grounding three-phase circuits to create a neutral in a three wire system, using a wye-delta transformer, or more commonly, a zigzag grounding winding.
Leakage transformer: Transformer that has loosely coupled windings.
Resonant transformer: Transformer that uses resonance to generate a high secondary voltage.
Audio transformer: Transformer used in audio equipment.
Output transformer: Transformer used to match the output of a valve amplifier to its load.
Instrument transformer: Potential or current transformer used to accurately and safely represent voltage, current or phase position of high voltage or high power circuits.
Pulse transformer: Specialized small-signal transformer used to transmit digital signaling while providing electrical isolation, commonly used in Ethernet computer networks as 10BASE-T, 100BASE-T and 1000BASE-T.

## Applications

Transformers are used to increase (or step-up) voltage before transmitting electrical energy over long distances through wires. Wires have resistance which loses energy through joule heating at a rate corresponding to square of the current. By transforming power to a higher voltage transformers enable economical transmission of power and distribution. Consequently, transformers have shaped the electricity supply industry, permitting generation to be located remotely from points of demand. All but a tiny fraction of the world's electrical power has passed through a series of transformers by the time it reaches the consumer.
Transformers are also used extensively in electronic products to decrease (or step-down) the supply voltage to a level suitable for the low voltage circuits they contain. The transformer also electrically isolates the end user from contact with the supply voltage.
Signal and audio transformers are used to couple stages of amplifiers and to match devices such as microphones and record players to the input of amplifiers. Audio transformers allowed telephone circuits to carry on a two-way conversation over a single pair of wires. A balun transformer converts a signal that is referenced to ground to a signal that has balanced voltages to ground, such as between external cables and internal circuits.

## History


### Discovery of induction

Electromagnetic induction, the principle of the operation of the transformer, was discovered independently by Michael Faraday in 1831, Joseph Henry in 1832, and others. The relationship between EMF and magnetic flux is an equation now known as Faraday's law of induction:
<formula>.
where <formula> is the magnitude of the EMF in Volts and ΦB is the magnetic flux through the circuit in webers.
Preceded by Francesco Zantedeschi in 1830, Faraday performed early experiments on induction between coils of wire, including winding a pair of coils around an iron ring, thus creating the first toroidal closed-core transformer. However he only applied individual pulses of current to his transformer, and never discovered the relation between the turns ratio and EMF in the windings.

### Induction coils

The first type of transformer to see wide use was the induction coil, invented by Rev. Nicholas Callan of Maynooth College, Ireland in 1836. He was one of the first researchers to realize the more turns the secondary winding has in relation to the primary winding, the larger the induced secondary EMF will be. Induction coils evolved from scientists ' and inventors ' efforts to get higher voltages from batteries. Since batteries produce direct current (DC) rather than AC, induction coils relied upon vibrating electrical contacts that regularly interrupted the current in the primary to create the flux changes necessary for induction. Between the 1830s and the 1870s, efforts to build better induction coils, mostly by trial and error, slowly revealed the basic principles of transformers.

### First alternating current transformers

By the 1870s, efficient generators producing alternating current (AC) were available, and it was found AC could power an induction coil directly, without an interrupter.
In 1876, Russian engineer Pavel Yablochkov invented a lighting system based on a set of induction coils where the primary windings were connected to a source of AC. The secondary windings could be connected to several ' electric candles ' (arc lamps) of his own design. The coils Yablochkov employed functioned essentially as transformers.
In 1878, the Ganz factory, Budapest, Hungary, began equipment for electric lighting and, by 1883, had installed over fifty systems in Austria-Hungary. Their AC systems used arc and incandescent lamps, generators, and other equipment.
Lucien Gaulard and John Dixon Gibbs first exhibited a device with an open iron core called a ' secondary generator ' in London in 1882, then sold the idea to the Westinghouse company in the United States. They also exhibited the invention in Turin, Italy in 1884, where it was adopted for an electric lighting system. However, the efficiency of their open-core bipolar apparatus remained very low.

### Early series circuit transformer distribution

Induction coils with open magnetic circuits are inefficient at transferring power to loads. Until about 1880, the paradigm for AC power transmission from a high voltage supply to a low voltage load was a series circuit. Open-core transformers with a ratio near 1: 1 were connected with their primaries in series to allow use of a high voltage for transmission while presenting a low voltage to the lamps. The inherent flaw in this method was that turning off a single lamp (or other electric device) affected the voltage supplied to all others on the same circuit. Many adjustable transformer designs were introduced to compensate for this problematic characteristic of the series circuit, including those employing methods of adjusting the core or bypassing the magnetic flux around part of a coil. Efficient, practical transformer designs did not appear until the 1880s, but within a decade, the transformer would be instrumental in the War of Currents, and in seeing AC distribution systems triumph over their DC counterparts, a position in which they have remained dominant ever since.

### Closed-core transformers and parallel power distribution

In the autumn of 1884, Károly Zipernowsky, Ottó Bláthy and Miksa Déri (ZBD), three engineers associated with the Ganz factory, had determined that open-core devices were impracticable, as they were incapable of reliably regulating voltage. In their joint 1885 patent applications for novel transformers (later called ZBD transformers), they described two designs with closed magnetic circuits where copper windings were either a) wound around iron wire ring core or b) surrounded by iron wire core. The two designs were the first application of the two basic transformer constructions in common use to this day, which can as a class all be termed as either core form or shell form (or alternatively, core type or shell type), as in a) or b), respectively (see images). The Ganz factory had also in the autumn of 1884 made delivery of the world's first five high-efficiency AC transformers, the first of these units having been shipped on September 16, 1884. This first unit had been manufactured to the following specifications: 1,400 W, 40 Hz, 120: 72 V, 11.6: 19.4 A, ratio 1.67: 1, one-phase, shell form.
In both designs, the magnetic flux linking the primary and secondary windings traveled almost entirely within the confines of the iron core, with no intentional path through air (see Toroidal cores below). The new transformers were 3.4 times more efficient than the open-core bipolar devices of Gaulard and Gibbs. The ZBD patents included two other major interrelated innovations: one concerning the use of parallel connected, instead of series connected, utilization loads, the other concerning the ability to have high turns ratio transformers such that the supply network voltage could be much higher (initially 1,400 to 2,000 V) than the voltage of utilization loads (100 V initially preferred). When employed in parallel connected electric distribution systems, closed-core transformers finally made it technically and economically feasible to provide electric power for lighting in homes, businesses and public spaces. Bláthy had suggested the use of closed cores, Zipernowsky had suggested the use of parallel shunt connections, and Déri had performed the experiments;
Transformers today are designed on the principles discovered by the three engineers. They also popularized the word ' transformer ' to describe a device for altering the EMF of an electric current, although the term had already been in use by 1882. In 1886, the ZBD engineers designed, and the Ganz factory supplied electrical equipment for, the world's first power station that used AC generators to power a parallel connected common electrical network, the steam-powered Rome-Cerchi power plant.
Although George Westinghouse had bought Gaulard and Gibbs ' patents in 1885, the Edison Electric Light Company held an option on the US rights for the ZBD transformers, requiring Westinghouse to pursue alternative designs on the same principles. He assigned to William Stanley the task of developing a device for commercial use in United States. Stanley's first patented design was for induction coils with single cores of soft iron and adjustable gaps to regulate the EMF present in the secondary winding (see image). This design was first used commercially in the US in 1886 but Westinghouse was intent on improving the Stanley design to make it (unlike the ZBD type) easy and cheap to produce.
Westinghouse, Stanley and associates soon developed an easier to manufacture core, consisting of a stack of thin ' E ‑ shaped ' iron plates, insulated by thin sheets of paper or other insulating material. Prewound copper coils could then be slid into place, and straight iron plates laid in to create a closed magnetic circuit. Westinghouse applied for a patent for the new low-cost design in December 1886; it was granted in July 1887.

### Other early transformer designs

In 1889, Russian-born engineer Mikhail Dolivo-Dobrovolsky developed the first three-phase transformer at the Allgemeine Elektricitäts-Gesellschaft (' General Electricity Company ') in Germany.
In 1891, Nikola Tesla invented the Tesla coil, an air-cored, dual-tuned resonant transformer for producing very high voltages at high frequency.
